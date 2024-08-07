import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma/prisma.service";
import {AdministradorCadastrarDTO} from "./dto/administrador-cadastrar.dto";
import {SituacaoLoginEnum} from "../autenticacao/enum/situacao-login-autenticacao.enum";
import {TipoUsuarioIndexEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";

@Injectable()
export class AdministradorService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async cadastrar(administradorCadastrarDTO: AdministradorCadastrarDTO): Promise<any> {
        administradorCadastrarDTO.usuario_situacao = SituacaoLoginEnum.ATIVO;
        administradorCadastrarDTO.tipo_usuario_id = TipoUsuarioIndexEnum.ADMIN;

        const is_administrador = await this.prisma.usuario.findUnique({
            where:{
                usuario_cpf: administradorCadastrarDTO.usuario_cpf,
            },
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(is_administrador){
            throw new HttpException(
                `Não é possível cadastrar esse administrador`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const administrador = await this.prisma.usuario.create({
            data: administradorCadastrarDTO,
            select:{
                usuario_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return {};
    }

}
