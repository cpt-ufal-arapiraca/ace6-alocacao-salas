import {Body, Controller, Get, Patch, Post, Query, Request} from '@nestjs/common';
import {Roles} from "./decorators/roles.decorator";
import {TipoUsuarioEnum} from "./enum/tipo-usuario-autenticacao.enum";
import {
    AlterarSenhaAutenticacaoDocs,
    EntrarAutenticacaoDocs,
    RecuperarSenhaAutenticacaoDocs, RedefinirSenhaAutenticacaoDocs,
    SairAutenticacaoDocs
} from "./autenticacao.swagger";
import {EntrarAutenticacaoDTO} from "./dto/entrar-autenticacao.dto";
import {AutenticacaoService} from "./autenticacao.service";
import {SairAutenticacaoDTO} from "./dto/sair-autenticacao.dto";
import {AlterarSenhaAutenticacaoDTO} from "./dto/alterar-senha-autenticacao.dto";
import {RecuperarSenhaAutenticacaoDTO} from "./dto/recuperar-senha-autenticacao.dto";
import {RedefinirSenhaAutenticacaoDTO} from "./dto/redefinir-senha-autenticacao.dto";

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(
        private autenticacaoService: AutenticacaoService,
    ) {}
    
    @Post('entrar')
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

    @Patch('alterarSenha')
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    @AlterarSenhaAutenticacaoDocs()
    async alterarSenha(
        @Body() alterarSenhaAutenticacaoDTO: AlterarSenhaAutenticacaoDTO,
        @Request() req,
    ): Promise<any> {
        alterarSenhaAutenticacaoDTO.usuario_id_fk = req.usuario_id;
        return await this.autenticacaoService.alterarSenha(alterarSenhaAutenticacaoDTO);
    }

    @Get('recuperarSenha')
    @RecuperarSenhaAutenticacaoDocs()
    async recuperarSenha(
        @Query() recuperarSenhaAutenticacaoDTO: RecuperarSenhaAutenticacaoDTO,
    ): Promise<any> {
        return await this.autenticacaoService.recuperarSenha(recuperarSenhaAutenticacaoDTO);
    }

    @Patch('redefinirSenha')
    @RedefinirSenhaAutenticacaoDocs()
    async redefinirSenha(
        @Body() redefinirSenhaAutenticacaoDTO: RedefinirSenhaAutenticacaoDTO,
    ): Promise<any> {
        return await this.autenticacaoService.redefinirSenha(redefinirSenhaAutenticacaoDTO);
    }

}
