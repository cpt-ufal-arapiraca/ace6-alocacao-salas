import {Body, Controller, Post, Put, Request} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {AdicionarUsuarioDTO} from "./dto/adicionar-usuario.dto";
import {AdicionarUsuarioDocs, AtualizarUsuarioDocs, CadastrarUsuarioDocs} from "./usuario.swagger";
import {CadastrarUsuarioDTO} from "./dto/cadastrar-usuario.dto";
import {Roles} from "../autenticacao/decorators/roles.decorator";
import {TipoUsuarioEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";
import {AtualizarUsuarioDTO} from "./dto/atualizar-usuario.dto";

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

    @Put('')
    @AtualizarUsuarioDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async atualizar(
        @Body() atualizarUsuarioDTO: AtualizarUsuarioDTO,
        @Request() req,
    ): Promise<any> {
        if(req.usuario_tipo !== TipoUsuarioEnum.ADMIN){
            atualizarUsuarioDTO.usuario_id = req.usuario_id;
        }
        atualizarUsuarioDTO.tipo_usuario_logado = req.usuario_tipo;
        return await this.usuarioService.atualizar(atualizarUsuarioDTO);
    }

}
