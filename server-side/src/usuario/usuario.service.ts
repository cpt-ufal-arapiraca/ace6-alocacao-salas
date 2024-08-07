import {Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma/prisma.service";
import {SituacaoLoginEnum} from "../autenticacao/enum/situacao-login-autenticacao.enum";
import {CadastrarUsuarioDTO} from "./dto/cadastrar-usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async cadastrar(cadastrarUsuarioDTO: CadastrarUsuarioDTO): Promise<any> {

        cadastrarUsuarioDTO.usuario_situacao = SituacaoLoginEnum.PENDENTE;

        const usuario = await this.prisma.usuario.create({
            data: cadastrarUsuarioDTO,
            select:{
                usuario_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return {};

    }

}
