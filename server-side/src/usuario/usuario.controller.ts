import {Body, Controller, Delete, Get, Param, Post, Put, Query, Request} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {AdicionarUsuarioDTO} from "./dto/adicionar-usuario.dto";
import {
    AdicionarUsuarioDocs,
    AtualizarUsuarioDocs,
    CadastrarUsuarioDocs, DeletarUsuarioDocs, ListarTipoUsuarioDocs,
    ListarUsuarioDocs,
    ObterUsuarioDocs
} from "./usuario.swagger";
import {CadastrarUsuarioDTO} from "./dto/cadastrar-usuario.dto";
import {Roles} from "../autenticacao/decorators/roles.decorator";
import {TipoUsuarioEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";
import {AtualizarUsuarioDTO} from "./dto/atualizar-usuario.dto";
import {ObterUsuarioDTO} from "./dto/obter-usuario.dto";
import {ListarUsuarioDTO} from "./dto/listar-usuario.dto";
import {DeletarUsuarioDTO} from "./dto/deletar-usuario.dto";

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

    @Get('eu')
    @ObterUsuarioDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async obterMe(
        @Request() req,
    ): Promise<any> {
        return await this.usuarioService.obter({usuario_id: req.usuario_id});
    }

    @Get(':usuario_id')
    @ObterUsuarioDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async obter(
        @Param() obterUsuarioDTO: ObterUsuarioDTO,
    ): Promise<any> {
        return await this.usuarioService.obter(obterUsuarioDTO);
    }

    @Get('')
    @ListarUsuarioDocs()
    @Roles(TipoUsuarioEnum.ADMIN)
    async listar(
        @Query() listarUsuarioDTO: ListarUsuarioDTO,
    ): Promise<any> {
        return await this.usuarioService.listar(listarUsuarioDTO);
    }

    @Delete('eu')
    @DeletarUsuarioDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async deletarMe(
        @Request() req,
    ): Promise<any> {
        return await this.usuarioService.deletar({usuario_id: req.usuario_id});
    }

    @Delete(':usuario_id')
    @DeletarUsuarioDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async deletar(
        @Param() deletarUsuarioDTO: DeletarUsuarioDTO,
        @Request() req,
    ): Promise<any> {
        if(req.usuario_tipo !== TipoUsuarioEnum.ADMIN){
            deletarUsuarioDTO.usuario_id = req.usuario_id;
        }else{
            if(!deletarUsuarioDTO.usuario_id){
                deletarUsuarioDTO.usuario_id = req.usuario_id;
            }
        }
        return await this.usuarioService.deletar(deletarUsuarioDTO);
    }

    @Get('tipos')
    @ListarTipoUsuarioDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async listarTipo(

    ): Promise<any> {
        return await this.usuarioService.listarTipo();
    }

}
