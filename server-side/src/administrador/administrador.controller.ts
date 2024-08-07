import {Body, Controller, Get, Post} from '@nestjs/common';
import {AdministradorService} from "./administrador.service";
import {
    CadastrarAdministradorDocs,
    ObterExistenciaAdministradorDocs
} from "./administrador.swagger";
import {AdministradorCadastrarDTO} from "./dto/administrador-cadastrar.dto";

@Controller('administrador')
export class AdministradorController {
    constructor(
        private administradorService: AdministradorService,
    ) {}

    @Post('')
    @CadastrarAdministradorDocs()
    async cadastrar(
        @Body() administradorCadastrarDTO: AdministradorCadastrarDTO,
    ): Promise<any> {
        return await this.administradorService.cadastrar(administradorCadastrarDTO);
    }

    @Get('verificar')
    @ObterExistenciaAdministradorDocs()
    async verificar(

    ): Promise<any> {
        return await this.administradorService.verificar();
    }

}
