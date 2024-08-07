import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma/prisma.service";
import {SituacaoLoginEnum} from "../autenticacao/enum/situacao-login-autenticacao.enum";
import {AdicionarUsuarioDTO} from "./dto/adicionar-usuario.dto";
import {CadastrarUsuarioDTO} from "./dto/cadastrar-usuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async adicionar(adicionarUsuarioDTO: AdicionarUsuarioDTO): Promise<any> {

        adicionarUsuarioDTO.usuario_situacao = SituacaoLoginEnum.PENDENTE;

        const usuario = await this.prisma.usuario.create({
            data: adicionarUsuarioDTO,
            select:{
                usuario_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return {};

    }

    async cadastrar(cadastrarUsuarioDTO: CadastrarUsuarioDTO): Promise<any> {

        cadastrarUsuarioDTO.usuario_situacao = SituacaoLoginEnum.ATIVO;

        const  is_usuario_pendente = await  this.prisma.usuario.findUnique({
            where:{
                usuario_cpf: cadastrarUsuarioDTO.usuario_cpf,
                usuario_situacao: SituacaoLoginEnum.PENDENTE,
            },
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(!is_usuario_pendente){
            throw new HttpException(
                `Não é possível cadastrar esse usuário`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const usuario = await this.prisma.usuario.update({
            where:{
                usuario_cpf: cadastrarUsuarioDTO.usuario_cpf,
            },
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
