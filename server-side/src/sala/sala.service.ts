import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarSalaDTO } from './dto/cadastrar-sala.dto';
import { RemoverSalaDTO } from './dto/remover-sala.dto';
import { AlterarSalaDTO } from './dto/alterar-sala.dto';
import { ObterSalaDTO } from './dto/obter-sala.dto';
import { ListarSalaDTO } from './dto/listar-sala.dto';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  async cadastrar(cadastrarSalaDTO: CadastrarSalaDTO): Promise<any> {

    const sala = await this.prisma.sala
      .create({
        data: cadastrarSalaDTO,
        select: {
          sala_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async deletar(removerSalaDTO: RemoverSalaDTO): Promise<any> {
    const sala = await this.prisma.sala
      .delete({
        where: {
          sala_codigo: removerSalaDTO.sala_codigo,
        },
        select: {
          sala_codigo: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async alterar(alterarSalaDTO: AlterarSalaDTO): Promise<any> {

    const { sala_codigo, ...atualizarSalaBDDTO } =
      alterarSalaDTO;

      console.log(atualizarSalaBDDTO);

    const sala = await this.prisma.sala
      .update({
        where: {
          sala_codigo: sala_codigo,
        },
        data: atualizarSalaBDDTO,
        select: {
          sala_codigo: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  
  async obter(obterSalaDTO: ObterSalaDTO): Promise<any> {

    const sala = await this.prisma.sala
      .findUnique({
        where: {
          sala_codigo: obterSalaDTO.sala_codigo,
        },
        select: {
          sala_id: true,
          sala_codigo: true,
          sala_tipo: true,
          sala_bloco: true,
          sala_capacidade: true,
            // sala_tipo_usuario: {
            //     select: {
            //         sala_tipo_sala_id: true,
            //         sala_tipo_usuario_nome: true,
            //     },
            // },
          },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    if (!sala) {
      throw new HttpException(
        `Não é possível obter essa sala`,
        HttpStatus.NOT_FOUND,
      );
    }

    return sala;
  }

  // Revisar
  async listar(listarSalaDTO: ListarSalaDTO): Promise<any> {
    const salas = await this.prisma.sala
      .findMany({
        where: {
          AND: [
            listarSalaDTO.sala_tipo
              ? {
                  sala_tipo: listarSalaDTO.sala_tipo,
                }
              : {},
              listarSalaDTO.sala_codigo
              ? {
                  sala_codigo: {
                    startsWith: listarSalaDTO.sala_codigo,
                  },
                }
              : {},
              // listarSalaDTO.usuario_nome
              // ? {
              //     usuario_nome: {
              //       contains: listarSalaDTO.usuario_nome,
              //     },
              //   }
              // : {},
          ],
        },
        skip: listarSalaDTO.pagina ? (listarSalaDTO.pagina - 1) * 10 : undefined,
        take: 10,
        orderBy: {
          sala_codigo: listarSalaDTO.ordenacao,
        },
        select: {
          sala_id: true,
          sala_codigo: true,
          sala_tipo: true,
          sala_bloco: true,
          sala_capacidade: true,
          // sala_tipo_usuario: {
          //   select: {
          //       sala_tipo_sala_id: true,
          //       sala_tipo_usuario_nome: true,
          //   },
          // },
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

      const totalSalas = await this.prisma.usuario.count();

      return {
          total: totalSalas,
          pagina: listarSalaDTO.pagina,
          quantidade: Math.ceil(totalSalas/10),
          salas: salas,
      };

  }
}
