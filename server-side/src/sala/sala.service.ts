import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarSalaDTO } from './dto/cadastrar-sala.dto';
import { RemoverSalaDTO } from './dto/remover-sala.dto';
import { AlterarSalaDTO } from './dto/alterar-sala.dto';

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

    const { codigo_sala, ...atualizarUsuarioBDDTO } =
      alterarSalaDTO;

    const is_sala_pendente = await this.prisma.sala
      .findUnique({
        where: {
          codigo_sala: codigo_sala,
          usuario_situacao: SituacaoLoginEnum.PENDENTE,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    if (is_usuario_pendente) {
      throw new HttpException(
        `Não é possível atualizar esse usuário`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const sala = await this.prisma.sala
      .update({
        where: {
          codigo_sala: codigo_sala,
        },
        data: atualizarUsuarioBDDTO,
        select: {
          codigo_sala: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

}
