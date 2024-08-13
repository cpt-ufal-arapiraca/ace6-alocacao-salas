import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CadastrarAdministradorDto } from './dto/cadastrar-administrador.dto';
import { SituacaoLoginEnum } from '../autenticacao/enum/situacao-login-autenticacao.enum';
import { TipoUsuarioIndexEnum } from '../autenticacao/enum/tipo-usuario-autenticacao.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdministradorService {
  constructor(private prisma: PrismaService) {}

  async cadastrar(
    cadastrarAdministradorDto: CadastrarAdministradorDto,
  ): Promise<any> {
    cadastrarAdministradorDto.usuario_situacao = SituacaoLoginEnum.ATIVO;
    cadastrarAdministradorDto.tipo_usuario_id_fk = TipoUsuarioIndexEnum.ADMIN;

    const is_administrador = await this.prisma.usuario
      .findUnique({
        where: {
          usuario_cpf: cadastrarAdministradorDto.usuario_cpf,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    if (is_administrador) {
      throw new HttpException(
        `Não é possível cadastrar esse administrador`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { autenticacao_senha, ...cadastrarAdministradorBDDto } =
      cadastrarAdministradorDto;

    const administrador = await this.prisma.usuario
      .create({
        data: cadastrarAdministradorBDDto,
        select: {
          usuario_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(autenticacao_senha, saltOrRounds);

    const autenticacao = await this.prisma.autenticacao
      .create({
        data: {
          autenticacao_senha: hash,
          autenticacao_situacao: SituacaoLoginEnum.ATIVO,
          usuario: {
            connect: { usuario_id: administrador.usuario_id },
          },
        },
        select: {
          autenticacao_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async verificar(): Promise<any> {
    const administrador = await this.prisma.usuario
      .findFirst({
        where: {
          tipo_usuario_id_fk: TipoUsuarioIndexEnum.ADMIN,
          usuario_situacao: SituacaoLoginEnum.ATIVO,
        },
        select: {
          usuario_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    if (!administrador) {
      throw new HttpException(
        `Não existe administrador cadastrado no sistema`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {};
  }
}
