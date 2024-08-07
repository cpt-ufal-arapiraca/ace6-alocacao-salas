import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { EntrarAutenticacaoDTO } from './dto/entrar-autenticacao.dto';
import { SituacaoLoginEnum } from './enum/situacao-login-autenticacao.enum';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {SairAutenticacaoDTO} from "./dto/sair-autenticacao.dto";
import {AlterarSenhaAutenticacaoDTO} from "./dto/alterar-senha-autenticacao.dto";
import {RecuperarSenhaAutenticacaoDTO} from "./dto/recuperar-senha-autenticacao.dto";
import {RedefinirSenhaAutenticacaoDTO} from "./dto/redefinir-senha-autenticacao.dto";

@Injectable()
export class AutenticacaoService {
  constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
  ) {}

    async entrar(
        entrarAutenticacaoDTO: EntrarAutenticacaoDTO,
    ): Promise<any> {

        const usuario = await this.prisma.usuario.findUnique({
            where:{
                usuario_cpf: entrarAutenticacaoDTO.usuario_cpf,
            },
            select:{
                usuario_cpf: true,
                usuario_id: true,
                autenticacao:{
                    select:{
                        autenticacao_senha: true,
                        autenticacao_situacao: true,
                    },
                },
                tipo_usuario:{
                    select:{
                    tipo_usuario_nome: true,
                    }
                }
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(!usuario || usuario.autenticacao.autenticacao_situacao !== SituacaoLoginEnum.ATIVO || !await bcrypt.compare(entrarAutenticacaoDTO.autenticacao_senha,  usuario.autenticacao.autenticacao_senha)){
            throw new HttpException('Dados de login incorretos', HttpStatus.UNAUTHORIZED);
        }

        const usuario_id: number = usuario.usuario_id;

        const autenticacao = await this.prisma.autenticacao.findUnique({
            where:{
                usuario_id_fk: usuario_id,
            },
            select:{
                usuario_id_fk: true,
                autenticacao_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });
    
        const payload = {
            sub: autenticacao.usuario_id_fk,
            role: usuario.tipo_usuario.tipo_usuario_nome,
        };

        const access_token: string = await this.jwtService.signAsync(payload);

        const sessao = await this.prisma.sessao.create({
            data: {
                sessao_ip: '', // Insira o IP aqui
                sessao_so: '', // Insira o SO aqui
                sessao_jwt: access_token,
                data_hora_login: new Date(),
                autenticacao: {
                    connect: { autenticacao_id: autenticacao.autenticacao_id },
                },
            },
            select:{
                sessao_jwt: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return { access_token: sessao.sessao_jwt};

    }

    async sair(sairAutenticacaoDTO: SairAutenticacaoDTO): Promise<any> {
        const sessao = await this.prisma.sessao.delete({
            where:{
                sessao_jwt: sairAutenticacaoDTO.sessao_jwt,
            },
            select:{
                sessao_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });
        return {};
    }

    async alterarSenha(alterarSenhaAutenticacaoDTO : AlterarSenhaAutenticacaoDTO): Promise<any> {

        if(alterarSenhaAutenticacaoDTO.autenticacao_senha !== alterarSenhaAutenticacaoDTO.autenticacao_senha_antiga){
            throw new HttpException(
                `As senhas são diferentes.`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const autenticacaoBD = await this.prisma.autenticacao.findUnique({
            where:{
                usuario_id_fk: alterarSenhaAutenticacaoDTO.usuario_id_fk
            },
            select:{
                autenticacao_id: true,
                autenticacao_senha: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        const senhaAntigaValida: boolean = await bcrypt.compare(
            alterarSenhaAutenticacaoDTO.autenticacao_senha_antiga,
            autenticacaoBD?.autenticacao_senha,
        );

        if(!senhaAntigaValida){
            throw new HttpException(
                `Senha antiga incorreta.`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(alterarSenhaAutenticacaoDTO.autenticacao_senha, saltOrRounds);

        const autenticacao =  this.prisma.autenticacao.update({
            data: {
                autenticacao_senha: hash,
            },
            where: { autenticacao_id: autenticacaoBD.autenticacao_id },
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return {};

    }

    async recuperarSenha(recuperarSenhaAutenticacaoDTO : RecuperarSenhaAutenticacaoDTO): Promise<any> {

        const usuario = await this.prisma.usuario.findUnique({
            where:{
                usuario_cpf: recuperarSenhaAutenticacaoDTO.usuario_cpf,
            },
            select:{
                usuario_cpf: true,
                usuario_id: true,
                autenticacao:{
                    select:{
                        autenticacao_senha: true,
                        autenticacao_situacao: true,
                        autenticacao_token: true,
                    },
                },
                tipo_usuario:{
                    select:{
                        tipo_usuario_nome: true,
                    }
                }
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(!usuario || usuario.autenticacao.autenticacao_situacao !== SituacaoLoginEnum.ATIVO){
            throw new HttpException('CPF incorreto ou inexistente', HttpStatus.UNAUTHORIZED);
        }

        let token: string = null;

        if(usuario){
            try {
                this.jwtService.verify(usuario.autenticacao.autenticacao_token);
                token = usuario.autenticacao.autenticacao_token;
            }catch(e){
                const payload = { sub: usuario.usuario_id };
                token = await this.jwtService.signAsync(payload);

                const autenticacao =  this.prisma.autenticacao.update({
                    data: {
                        autenticacao_token: token,
                    },
                    where: { usuario_id_fk: usuario.usuario_id},
                }).catch((e) => {
                    throw this.prisma.tratamentoErros(e)
                });
            }
        }else{
            const payload = { sub: usuario.usuario_id };
            token = await this.jwtService.signAsync(payload);

            const autenticacao =  this.prisma.autenticacao.update({
                data: {
                    autenticacao_token: token,
                },
                where: { usuario_id_fk: usuario.usuario_id},
            }).catch((e) => {
                throw this.prisma.tratamentoErros(e)
            });

        }

        return {autenticacao_token:  token};

    }

    async redefinirSenha(redefinirSenhaAutenticacaoDTO : RedefinirSenhaAutenticacaoDTO): Promise<any> {

        const autenticacao_token: string = redefinirSenhaAutenticacaoDTO.autenticacao_token;

        const decodedToken = this.jwtService.decode(autenticacao_token);

        if (!decodedToken) {
            throw new HttpException(
                `Token inválido.`,
                HttpStatus.BAD_REQUEST,
            );
        }

        const usuario_id = decodedToken.sub;

        const autenticacaoBD = await this.prisma.autenticacao.findUnique({
            where:{
              usuario_id_fk: usuario_id,
              autenticacao_token: autenticacao_token,
            },
            select:{
                autenticacao_id: true,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        if(!autenticacaoBD){
            throw new HttpException(
                `Token não existe.`,
                HttpStatus.NOT_FOUND,
            );
        }

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(redefinirSenhaAutenticacaoDTO.autenticacao_senha, saltOrRounds);

        const autenticacao =  this.prisma.autenticacao.update({
            data: {
                autenticacao_senha: hash,
                autenticacao_token: null,
            },
            where: { autenticacao_id: autenticacaoBD.autenticacao_id },
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e)
        });

        return {};

    }
    

}
