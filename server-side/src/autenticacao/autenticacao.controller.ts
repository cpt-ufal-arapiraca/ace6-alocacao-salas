import {Body, Controller, Get, Post, Request as NestRequest} from '@nestjs/common';
import {Roles} from "./decorators/roles.decorator";
import {TipoUsuarioEnum} from "./enum/tipo-usuario-autenticacao.enum";
import {EntrarAutenticacaoDocs, SairAutenticacaoDocs} from "./autenticacao.swagger";
import {EntrarAutenticacaoDTO} from "./dto/entrar-autenticacao.dto";
import {AutenticacaoService} from "./autenticacao.service";
import {SairAutenticacaoDTO} from "./dto/sair-autenticacao.dto";

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(private autenticacaoService: AutenticacaoService) {}
    
    @Post('entrar')
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    @EntrarAutenticacaoDocs()
    async entrar(
        @Body() entrarAutenticacaoDTO: EntrarAutenticacaoDTO,
    ): Promise<any> {
        return await this.autenticacaoService.entrar(entrarAutenticacaoDTO);
    }

    @Get('sair')
    @SairAutenticacaoDocs()
    async sair(
        @NestRequest() sairAutenticacaoDTO: SairAutenticacaoDTO,
    ): Promise<any> {
        return this.autenticacaoService.sair(sairAutenticacaoDTO);
    }

}
