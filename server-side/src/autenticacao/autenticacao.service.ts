import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { EntrarAutenticacaoDTO } from './dto/entrar-autenticacao.dto';
import { SituacaoLoginEnum } from './enum/situacao-login-autenticacao.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  constructor(private prisma: PrismaService) {}

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
                login:{
                    select:{
                        login_senha: true,
                        login_situacao: true,
                    },
                },
                tipo_usuario:{
                    select:{
                    tipo_usuario_nome: true,
                    }
                }
            }
        })

        if(!usuario || usuario.login.login_situacao !== SituacaoLoginEnum.ATIVO || !await bcrypt.compare(entrarAutenticacaoDTO.login_senha,  usuario.login.login_senha)){
            throw new HttpException('Dados de login incorretos', HttpStatus.UNAUTHORIZED);
        }

        const usuario_id: number = usuario.usuario_id;

        const login = await this.prisma.login.findUnique({
            where:{
                usuario_id_fk: usuario_id,
            },
        });
    
        const payload = { sub: login.usuario_id_fk };
        const access_token: string = await this.jwtService.signAsync(payload);
    
        /*
        const dataExpiracao = new Date();
        dataExpiracao.setHours(dataExpiracao.getHours() + 24);
    
        const criarSessaoDTO: CriarSessaoDTO = new CriarSessaoDTO(
          entrarAutenticacaoDTO.sess_sistema_operacional,
          access_token,
          new Date(),
          dataExpiracao,
          autenticacao.autenticacao_id,
          entrarAutenticacaoDTO.sess_ip,
        );
    
        const sessao = await this.sessaoService.criar(
            criarSessaoDTO
        ).catch((e) => {
          throw this.prisma.tratamentoErros(e)
        });
    
        */
        return { id_sessao: sessao.sess_id_sessao, access_token: access_token };
  
    }
    

}
