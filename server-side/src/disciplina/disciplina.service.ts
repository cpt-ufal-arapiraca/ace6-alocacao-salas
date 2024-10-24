import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarDisciplinaDTO } from './dto/cadastrar-disciplina.dto';
import { AlterarDisciplinaDTO } from './dto/alterar-disciplina.dto';
import { ObterDisciplinaDTO } from './dto/obter-disciplina.dto';
import { DeletarDisciplinaDTO } from './dto/deletar-disciplina.dto';
import { ListarDisciplinaDTO } from './dto/listar-disciplina.dto';

@Injectable()
export class DisciplinaService {
    constructor(private prisma: PrismaService) {}

    async cadastrar(cadastrarDisciplinaDTO: CadastrarDisciplinaDTO): Promise<any> {

    const disciplina = await this.prisma.disciplina
      .create({
        data: cadastrarDisciplinaDTO,
        select: {
          disciplina_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async alterar(alterarDisciplinaDTO: AlterarDisciplinaDTO): Promise<any> {

    const { disciplina_codigo, ...atualizarDisciplinaBDDTO } =
      alterarDisciplinaDTO;

    const desciplina = await this.prisma.disciplina
      .update({
        where: {
          disciplina_codigo: disciplina_codigo,
        },
        data: atualizarDisciplinaBDDTO,
        select: {
          disciplina_codigo: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });
    return {};
  }

  
  async obter(obterDisciplinaDTO: ObterDisciplinaDTO): Promise<any> {

    const disciplina = await this.prisma.disciplina
      .findUnique({
        where: {
          disciplina_codigo: obterDisciplinaDTO.disciplina_codigo,
        },
        select: {
          disciplina_id: true,
          disciplina_codigo: true,
          disciplina_nome: true,
          disciplina_curso: true,
          disciplina_periodo: true,
          disciplina_PPCA: true,
          },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    if (!disciplina) {
      throw new HttpException(
        `Não é possível obter essa disciplina`,
        HttpStatus.NOT_FOUND,
      );
    }

    return disciplina;
  }


  async deletar(deletarDisciplinaDTO: DeletarDisciplinaDTO): Promise<any> {
    const disciplina = await this.prisma.disciplina
      .delete({
        where: {
          disciplina_codigo: deletarDisciplinaDTO.disciplina_codigo,
        },
        select: {
          disciplina_codigo: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async listar(listarDisciplinaDTO: ListarDisciplinaDTO): Promise<any> {
    const disciplinas = await this.prisma.disciplina
      .findMany({
        where: {
          AND: [
            listarDisciplinaDTO.disciplina_curso
              ? {
                  disciplina_curso: listarDisciplinaDTO.disciplina_curso,
                }
              : {},
              listarDisciplinaDTO.disciplina_codigo
              ? {
                  disciplina_codigo: {
                    startsWith: listarDisciplinaDTO.disciplina_codigo,
                  },
                }
              : {},
              
          ],
        },
        skip: listarDisciplinaDTO.pagina ? (listarDisciplinaDTO.pagina - 1) * 10 : undefined,
        take: 10,
        orderBy: {
          disciplina_codigo: listarDisciplinaDTO.ordenacao,
        },
        select: {
          disciplina_id: true,
          disciplina_codigo: true,
          disciplina_nome: true,
          disciplina_curso: true,
          disciplina_periodo: true,
          disciplina_PPCA: true,
          
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

      const totalDisciplinas = await this.prisma.disciplina.count();

      return {
          total: totalDisciplinas,
          pagina: listarDisciplinaDTO.pagina,
          quantidade: Math.ceil(totalDisciplinas/10),
          disciplinas: disciplinas,
      };

  }
}


