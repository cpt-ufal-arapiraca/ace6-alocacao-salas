import {Body, Controller, Get, Post} from '@nestjs/common';
import {AdministradorService} from "./administrador.service";
import {
    CadastrarAdministradorDocs,
    ObterExistenciaAdministradorDocs
} from "./administrador.swagger";
import {CadastrarAdministradorDto} from "./dto/cadastrar-administrador.dto";

@Controller('administrador')
export class AdministradorController {
    constructor(
        private administradorService: AdministradorService,
    ) {}

    @Post('')
    @CadastrarAdministradorDocs()
    async cadastrar(
        @Body() cadastrarAdministradorDto: CadastrarAdministradorDto,
    ): Promise<any> {
        return await this.administradorService.cadastrar(cadastrarAdministradorDto);
    }

    @Get('verificar')
    @ObterExistenciaAdministradorDocs()
    async verificar(

    ): Promise<any> {
        return await this.administradorService.verificar();
    }

}
