import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma/prisma.service";
import {TipoUsuarioIndexEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";
import {SituacaoLoginEnum} from "../autenticacao/enum/situacao-login-autenticacao.enum";
import {UsuarioAdicionarDTO} from "./dto/usuario-adicionar.dto";

@Injectable()
export class UsuarioService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async adicionar(usuarioAdicionarDTO: UsuarioAdicionarDTO): Promise<any> {

        usuarioAdicionarDTO.usuario_situacao = SituacaoLoginEnum.PENDENTE;

        const usuario = await this.prisma.usuario.create({
            data: usuarioAdicionarDTO,
            select:{
                usuario_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return {};
        
    }

}
