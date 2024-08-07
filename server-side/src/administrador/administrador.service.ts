import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma/prisma.service";
import {CadastrarAdministradorDto} from "./dto/cadastrar-administrador.dto";
import {SituacaoLoginEnum} from "../autenticacao/enum/situacao-login-autenticacao.enum";
import {TipoUsuarioIndexEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";
import {SairAutenticacaoDTO} from "../autenticacao/dto/sair-autenticacao.dto";

@Injectable()
export class AdministradorService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async cadastrar(cadastrarAdministradorDto: CadastrarAdministradorDto): Promise<any> {
        cadastrarAdministradorDto.usuario_situacao = SituacaoLoginEnum.ATIVO;
        cadastrarAdministradorDto.tipo_usuario_id = TipoUsuarioIndexEnum.ADMIN;

        const is_administrador = await this.prisma.usuario.findUnique({
            where:{
                usuario_cpf: cadastrarAdministradorDto.usuario_cpf,
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
            data: cadastrarAdministradorDto,
            select:{
                usuario_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return {};
    }

    async verificar(): Promise<any> {

        const administrador = await this.prisma.usuario.findFirst({
            where:{
                tipo_usuario_id: TipoUsuarioIndexEnum.ADMIN,
                usuario_situacao: SituacaoLoginEnum.ATIVO,
            },
            select:{
                usuario_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(!administrador){
            throw new HttpException(
                `Não existe administrador cadastrado no sistema`,
                HttpStatus.NOT_FOUND,
            );
        }

        return {};
    }

}
