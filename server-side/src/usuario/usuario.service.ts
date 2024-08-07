import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../utils/prisma/prisma.service";
import {SituacaoLoginEnum} from "../autenticacao/enum/situacao-login-autenticacao.enum";
import {AdicionarUsuarioDTO} from "./dto/adicionar-usuario.dto";
import {CadastrarUsuarioDTO} from "./dto/cadastrar-usuario.dto";
import {AtualizarUsuarioDTO} from "./dto/atualizar-usuario.dto";
import {TipoUsuarioEnum, TipoUsuarioIndexEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";
import {ObterUsuarioDTO} from "./dto/obter-usuario.dto";
import {ListarUsuarioDTO} from "./dto/listar-usuario.dto";

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

    async atualizar(atualizarUsuarioDTO: AtualizarUsuarioDTO, ): Promise<any> {

        if( atualizarUsuarioDTO.tipo_usuario_logado !== TipoUsuarioEnum.ADMIN ){
            delete atualizarUsuarioDTO.tipo_usuario_id;
        }

        const  is_usuario_pendente = await  this.prisma.usuario.findUnique({
            where:{
                usuario_id: atualizarUsuarioDTO.usuario_id,
                usuario_situacao: SituacaoLoginEnum.PENDENTE,
            },
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(!is_usuario_pendente){
            throw new HttpException(
                `Não é possível atualizar esse usuário`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const usuario = await this.prisma.usuario.update({
            where:{
                usuario_id: atualizarUsuarioDTO.usuario_id,
            },
            data: atualizarUsuarioDTO,
            select:{
                usuario_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return {};

    }

    async obter(obterUsuarioDTO: ObterUsuarioDTO): Promise<any> {

        const  is_usuario_pendente = await  this.prisma.usuario.findUnique({
            where:{
                usuario_id: obterUsuarioDTO.usuario_id,
                usuario_situacao: SituacaoLoginEnum.PENDENTE,
            },
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(!is_usuario_pendente){
            throw new HttpException(
                `Não é possível obter esse usuário`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const usuario = await this.prisma.usuario.findUnique({
            where:{
                usuario_id: obterUsuarioDTO.usuario_id,
            },
            select:{
                usuario_id: true,
                usuario_nome: true,
                usuario_cpf: true,
                usuario_email: true,
                tipo_usuario:{
                    select:{
                        tipo_usuario_nome: true,
                    }
                }
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(!usuario){
            throw new HttpException(
                `Não é possível obter esse usuário`,
                HttpStatus.NOT_FOUND,
            );
        }

        return usuario;

    }


    async listar(listarUsuarioDTO: ListarUsuarioDTO): Promise<any> {
        return  await this.prisma.usuario.findMany({
            where: {
                AND: [
                    listarUsuarioDTO.usuario_cpf ? {
                        usuario_cpf: {
                            startsWith: listarUsuarioDTO.usuario_cpf,
                        },
                    } : {},
                    listarUsuarioDTO.usuario_nome ? {
                        usuario_nome: {
                            contains: listarUsuarioDTO.usuario_nome,
                        },
                    } : {},
                ],
            },
            skip: listarUsuarioDTO.cursor ? 1 : undefined,
            take: 10,
            cursor: listarUsuarioDTO.cursor ? { usuario_id: listarUsuarioDTO.cursor } : undefined,
            orderBy: {
                usuario_nome: listarUsuarioDTO.ordenacao,
            },
            select: {
                usuario_id: true,
                usuario_nome: true,
                usuario_cpf: true,
                usuario_email: true,
                tipo_usuario: {
                    select: {
                        tipo_usuario_nome: true,
                    }
                },
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e);
        });

    }


}
