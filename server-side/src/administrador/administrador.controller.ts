import {Body, Controller, Post} from '@nestjs/common';
import {AdministradorService} from "./administrador.service";
import {CasdastrarAdministradorDocs} from "./administrador.swagger";
import {AdministradorCadastrarDTO} from "./dto/administrador-cadastrar.dto";

@Controller('administrador')
export class AdministradorController {
    constructor(
        private administradorService: AdministradorService,
    ) {}

    @Post('')
    @CasdastrarAdministradorDocs()
    async cadastrar(
        @Body() administradorCadastrarDTO: AdministradorCadastrarDTO,
    ): Promise<any> {
        return await this.administradorService.cadastrar(administradorCadastrarDTO);
    }

}
