import {Body, Controller, Get, Post, Put, Request} from '@nestjs/common';
import {Roles} from "./decorators/roles.decorator";
import {TipoUsuarioEnum} from "./enum/tipo-usuario-autenticacao.enum";
import {AlterarSenhaAutenticacaoDocs, EntrarAutenticacaoDocs, SairAutenticacaoDocs} from "./autenticacao.swagger";
import {EntrarAutenticacaoDTO} from "./dto/entrar-autenticacao.dto";
import {AutenticacaoService} from "./autenticacao.service";
import {SairAutenticacaoDTO} from "./dto/sair-autenticacao.dto";
import {AlterarSenhaAutenticacaoDTO} from "./dto/alterar-senha-autenticacao.dto";

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(private autenticacaoService: AutenticacaoService) {}
    
    @Post('entrar')
    @Roles()
    @EntrarAutenticacaoDocs()
    async entrar(
        @Body() entrarAutenticacaoDTO: EntrarAutenticacaoDTO,
    ): Promise<any> {
        return await this.autenticacaoService.entrar(entrarAutenticacaoDTO);
    }

    @Get('sair')
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    @SairAutenticacaoDocs()
    async sair(
        @Request() sairAutenticacaoDTO: SairAutenticacaoDTO,
    ): Promise<any> {
        return this.autenticacaoService.sair(sairAutenticacaoDTO);
    }

    @Put('alterarSenha')
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    @AlterarSenhaAutenticacaoDocs()
    async alterarSenha(
        @Body() alterarSenhaAutenticacaoDTO: AlterarSenhaAutenticacaoDTO,
        @Request() req,
    ): Promise<any> {
        alterarSenhaAutenticacaoDTO.usuario_id_fk = req.usuario_id;
        return await this.autenticacaoService.alterarSenha(alterarSenhaAutenticacaoDTO);
    }

}
