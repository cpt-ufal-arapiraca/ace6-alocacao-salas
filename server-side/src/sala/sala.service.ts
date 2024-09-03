import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarSalaDTO } from './dto/cadastrar-sala.dto';
import { RemoverSalaDTO } from './dto/remover-sala.dto';
import { AlterarSalaDTO } from './dto/alterar-sala.dto';
import { ObterSalaDTO } from './dto/obter-sala.dto';

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
          codigo_sala: removerSalaDTO.codigo_sala,
        },
        select: {
          codigo_sala: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async alterar(alterarSalaDTO: AlterarSalaDTO): Promise<any> {

    const { codigo_sala, ...atualizarSalaBDDTO } =
      alterarSalaDTO;

    const sala = await this.prisma.sala
      .update({
        where: {
          codigo_sala: codigo_sala,
        },
        data: atualizarSalaBDDTO,
        select: {
          codigo_sala: true,
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
          codigo_sala: obterSalaDTO.codigo_sala,
        },
        select: {
          sala_id: true,
          codigo_sala: true,
          tipo: true,
          bloco: true,
          capacidade: true,
            // tipo_usuario: {
            //     select: {
            //         tipo_usuario_id: true,
            //         tipo_usuario_nome: true,
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

}
