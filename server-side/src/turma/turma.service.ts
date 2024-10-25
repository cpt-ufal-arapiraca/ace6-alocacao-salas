import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarTurmaDTO } from './dto/cadastrar-turma.dto';
import { AlterarTurmaDTO } from './dto/alterar-turma.dto';
import { RemoverTurmaDTO } from './dto/remover-turma.dto';
import { ObterTurmaDTO } from './dto/obter-turma.dto';
import { ListarTurmaDTO } from './dto/listar-turma.dto';


@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) {}

  async cadastrar(cadastrarTurmaDTO: CadastrarTurmaDTO): Promise<any> {

    const turma = await this.prisma.turma
      .create({
        data: cadastrarTurmaDTO,
        select: {
          turma_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async deletar(removerTurmaDTO: RemoverTurmaDTO): Promise<any> {
    const turma = await this.prisma.turma
      .delete({
        where: {
          turma_codigo: removerTurmaDTO.turma_codigo,
        },
        select: {
          turma_codigo: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async alterar(alterarTurmaDTO: AlterarTurmaDTO): Promise<any> {

    const { turma_codigo, ...atualizarTurmaBDDTO } =
      alterarTurmaDTO;

    const turma = await this.prisma.turma
      .update({
        where: {
          turma_codigo: turma_codigo,
        },
        data: atualizarTurmaBDDTO,
        select: {
          turma_codigo: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  
  async obter(obterTurmaDTO: ObterTurmaDTO): Promise<any> {

    const turma = await this.prisma.turma
      .findUnique({
        where: {
          turma_codigo: obterTurmaDTO.turma_codigo,
        },
        select: {
          turma_id: true,
          turma_codigo: true,
          turma_professor: true,
          turma_turno: true,
          turma_capacidade: true,
          turma_horario: true,
          turma_tipo: true,

          },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    if (!turma) {
      throw new HttpException(
        `Não é possível obter essa turma`,
        HttpStatus.NOT_FOUND,
      );
    }

    return turma;
  }

  // Revisar
  async listar(listarTurmaDTO: ListarTurmaDTO): Promise<any> {
    const turmas = await this.prisma.turma
      .findMany({
        where: {
          AND: [
            listarTurmaDTO.turma_tipo
              ? {
                  turma_tipo: listarTurmaDTO.turma_tipo,
                }
              : {},
              listarTurmaDTO.turma_codigo
              ? {
                  turma_codigo: {
                    startsWith: listarTurmaDTO.turma_codigo,
                  },
                }
              : {},
          ],
        },
        skip: listarTurmaDTO.pagina ? (listarTurmaDTO.pagina - 1) * 10 : undefined,
        take: 10,
        orderBy: {
          turma_codigo: listarTurmaDTO.ordenacao,
        },
        select: {
          turma_id: true,
          turma_codigo: true,
          turma_professor: true,
          turma_capacidade: true,
          turma_horario: true,
          turma_tipo: true,
          // tipo_usuario: {
          //   select: {
          //       tipo_sala_id: true,
          //       tipo_usuario_nome: true,
          //   },
          // },
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

      const totalTurmas = await this.prisma.turma.count();

      return {
          total: totalTurmas,
          pagina: listarTurmaDTO.pagina,
          quantidade: Math.ceil(totalTurmas/10),
          salas: turmas,
      };

  }
}
