import {Body, Controller, Post} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {AdicionarUsuarioDTO} from "./dto/adicionar-usuario.dto";
import {AdicionarUsuarioDocs} from "./usuario.swagger";
import {CadastrarUsuarioDTO} from "./dto/cadastrar-usuario.dto";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService,
    ) {}

    @Post('adicionar')
    @AdicionarUsuarioDocs()
    async adicionar(
        @Body() adicionarUsuarioDTO: AdicionarUsuarioDTO,
    ): Promise<any> {
        return await this.usuarioService.adicionar(adicionarUsuarioDTO);
    }

}
