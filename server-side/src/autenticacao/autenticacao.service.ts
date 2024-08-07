import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { EntrarAutenticacaoDTO } from './dto/entrar-autenticacao.dto';
import { SituacaoLoginEnum } from './enum/situacao-login-autenticacao.enum';
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import * as bcrypt from 'bcrypt';

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

        if(!usuario || usuario.autenticacao.autenticacao_situacao !== SituacaoLoginEnum.ATIVO || !await bcrypt.compare(entrarAutenticacaoDTO.login_senha,  usuario.autenticacao.autenticacao_senha)){
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
    

}
