import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { TipoUsuarioEnum } from 'src/autenticacao/enum/tipo-usuario-autenticacao.enum';
import { CadastrarDisciplinaDTO } from './dto/cadastrar-disciplina.dto';
import { AlterarDisciplinaDocs, CadastrarDisciplinaDocs, deletarDisciplinaDocs, ListarDisciplinaDocs, ObterDisciplinaDocs } from './disciplina.swagger';
import { AlterarDisciplinaDTO } from './dto/alterar-disciplina.dto';
import { ObterDisciplinaDTO } from './dto/obter-disciplina.dto';
import { DeletarDisciplinaDTO } from './dto/deletar-disciplina.dto';
import { ListarDisciplinaDTO } from './dto/listar-disciplina.dto';


@Controller('disciplina')
export class DisciplinaController {
    constructor(
        private disciplinaService: DisciplinaService,
    ) {}
    @Post('')
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE)
    @CadastrarDisciplinaDocs()
    async cadastrar(
        @Body() cadastrarDisciplinaDTO: CadastrarDisciplinaDTO,
    ): Promise<any> {
        return await this.disciplinaService.cadastrar(cadastrarDisciplinaDTO);
    }

     
    @Put('')
    @AlterarDisciplinaDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR)
    async atualizar(
        @Body() alterarDisciplinaDTO: AlterarDisciplinaDTO,
    ): Promise<any> {
        return await this.disciplinaService.alterar(alterarDisciplinaDTO);
    }


    @Get(':codigo_disciplina')
    @ObterDisciplinaDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async obter(
        @Param() obterDisciplinaDTO: ObterDisciplinaDTO,
    ): Promise<any> {
        return await this.disciplinaService.obter(obterDisciplinaDTO);
    }


    @Delete(':disciplina_codigo')
    @deletarDisciplinaDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR)
    async deletar(
        @Param() deletarDisciplinaDTO: DeletarDisciplinaDTO,
    ): Promise<any> {
        return await this.disciplinaService.deletar(deletarDisciplinaDTO);
    }

    @Get('')
    @ListarDisciplinaDocs()
    @Roles(TipoUsuarioEnum.ADMIN)
    async listar(
        @Query() listarDisciplinaDTO: ListarDisciplinaDTO,
    ): Promise<any> {
        return await this.disciplinaService.listar(listarDisciplinaDTO);
    }
}
