import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarDisciplinaDTO } from './dto/cadastrar-disciplina.dto';
import { AlterarDisciplinaDTO } from './dto/alterar-sala.dto';
import { ObterDisciplinaDTO } from './dto/obter-disciplina.dto';

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

    const { codigo_disciplina, ...atualizarDisciplinaBDDTO } =
      alterarDisciplinaDTO;

    const desciplina = await this.prisma.disciplina
      .update({
        where: {
          codigo_disciplina: codigo_disciplina,
        },
        data: atualizarDisciplinaBDDTO,
        select: {
          codigo_disciplina: true,
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
          codigo_disciplina: obterDisciplinaDTO.codigo_disciplina,
        },
        select: {
          disciplina_id: true,
          codigo_disciplina: true,
          nome: true,
          curso: true,
          periodo: true,
          PPCA: true,
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

}


