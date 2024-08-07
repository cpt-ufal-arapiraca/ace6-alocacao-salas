import {Body, Controller, Post} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {AdicionarUsuarioDTO} from "./dto/adicionar-usuario.dto";
import {AdicionarUsuarioDocs, CadastrarUsuarioDocs} from "./usuario.swagger";
import {CadastrarUsuarioDTO} from "./dto/cadastrar-usuario.dto";
import {Roles} from "../autenticacao/decorators/roles.decorator";
import {TipoUsuarioEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService,
    ) {}

    @Post('adicionar')
    @Roles(TipoUsuarioEnum.ADMIN)
    @AdicionarUsuarioDocs()
    async adicionar(
        @Body() adicionarUsuarioDTO: AdicionarUsuarioDTO,
    ): Promise<any> {
        return await this.usuarioService.adicionar(adicionarUsuarioDTO);
    }

    @Post('')
    @CadastrarUsuarioDocs()
    async cadastrar(
        @Body() cadastrarUsuarioDTO: CadastrarUsuarioDTO,
    ): Promise<any> {
        return await this.usuarioService.cadastrar(cadastrarUsuarioDTO);
    }

}
