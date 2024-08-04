import {Body, Controller, Get, Post} from '@nestjs/common';
import {Roles} from "./decorators/roles.decorator";
import {TipoUsuarioEnum} from "./enum/tipos-usuarios-autenticacao.enum";
import {EntrarAutenticacaoDocs} from "./autenticacao.swagger";
import {EntrarAutenticacaoDTO} from "./dto/entrar-autenticacao.dto";
import {AutenticacaoService} from "./autenticacao.service";

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(private autenticacaoService: AutenticacaoService) {}
    
    @Post('entrar')
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.COORDENADOR)
    @EntrarAutenticacaoDocs()
    async entrar(
        @Body() entrarAutenticacaoDTO: EntrarAutenticacaoDTO,
    ): Promise<any> {
        return entrarAutenticacaoDTO;
    }

}
