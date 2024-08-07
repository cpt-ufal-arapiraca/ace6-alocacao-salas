import {Body, Controller, Post} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {CadastrarUsuarioDTO} from "./dto/cadastrar-usuario.dto";
import {CadastrarUsuarioDocs} from "./usuario.swagger";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService,
    ) {}

    @Post('')
    @CadastrarUsuarioDocs()
    async adicionar(
        @Body() cadastrarUsuarioDTO: CadastrarUsuarioDTO,
    ): Promise<any> {
        return await this.usuarioService.cadastrar(cadastrarUsuarioDTO);
    }

}
