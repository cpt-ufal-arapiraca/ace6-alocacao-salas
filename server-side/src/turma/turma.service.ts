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
          codigo_turma: removerTurmaDTO.codigo_turma,
        },
        select: {
          codigo_turma: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async alterar(alterarTurmaDTO: AlterarTurmaDTO): Promise<any> {

    const { codigo_turma, ...atualizarTurmaBDDTO } =
      alterarTurmaDTO;

    const turma = await this.prisma.turma
      .update({
        where: {
          codigo_turma: codigo_turma,
        },
        data: atualizarTurmaBDDTO,
        select: {
          codigo_turma: true,
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
          codigo_turma: obterTurmaDTO.codigo_turma,
        },
        select: {
          turma_id: true,
          codigo_turma: true,
          professor: true,
          turno: true,
          capacidade: true,
          horario: true,
          tipo: true,

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
            listarTurmaDTO.tipo
              ? {
                  tipo: listarTurmaDTO.tipo,
                }
              : {},
              listarTurmaDTO.codigo_turma
              ? {
                  codigo_turma: {
                    startsWith: listarTurmaDTO.codigo_turma,
                  },
                }
              : {},
          ],
        },
        skip: listarTurmaDTO.pagina ? (listarTurmaDTO.pagina - 1) * 10 : undefined,
        take: 10,
        orderBy: {
          codigo_turma: listarTurmaDTO.ordenacao,
        },
        select: {
          turma_id: true,
          codigo_turma: true,
          professor: true,
          capacidade: true,
          horario: true,
          tipo: true,
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