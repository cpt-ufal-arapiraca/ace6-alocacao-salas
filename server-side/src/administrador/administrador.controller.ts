import {Body, Controller, Post} from '@nestjs/common';
import {AdministradorService} from "./administrador.service";
import {Roles} from "../autenticacao/decorators/roles.decorator";
import {EntrarAutenticacaoDocs} from "../autenticacao/autenticacao.swagger";
import {EntrarAutenticacaoDTO} from "../autenticacao/dto/entrar-autenticacao.dto";
import {CasdastrarAdministradorDocs} from "./administrador.swagger";
import {AdministradorCadastrarDTO} from "./dto/administrador-cadastrar.dto";

@Controller('administrador')
export class AdministradorController {
    constructor(
        private administradorService: AdministradorService,
    ) {}

    @Post('')
    @CasdastrarAdministradorDocs()
    async entrar(
        @Body() administradorCadastrarDTO: AdministradorCadastrarDTO,
    ): Promise<any> {
        return await this.administradorService.cadastrar(administradorCadastrarDTO);
    }

}
