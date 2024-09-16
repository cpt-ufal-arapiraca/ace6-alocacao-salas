import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { TipoUsuarioEnum } from 'src/autenticacao/enum/tipo-usuario-autenticacao.enum';
import { CadastrarTurmaDTO } from './dto/cadastrar-turma.dto';
import { AlterarTurmaDocs, CadastrarTurmaDocs, ListarTurmaDocs, ObterTurmaDocs, RemoverTurmaDocs } from './turma.swagger';
import { TurmaService } from './turma.service';
import { AlterarTurmaDTO } from './dto/alterar-turma.dto';
import { RemoverTurmaDTO } from './dto/remover-turma.dto';
import { ObterTurmaDTO } from './dto/obter-turma.dto';
import { ListarTurmaDTO } from './dto/listar-turma.dto';

@Controller('turma')
export class TurmaController {
    constructor(
        private turmaService: TurmaService,
    ) {}
    @Post('')
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE)
    @CadastrarTurmaDocs()
    async cadastrar(
        @Body() cadastrarTurmaDTO: CadastrarTurmaDTO,
    ): Promise<any> {
        return await this.turmaService.cadastrar(cadastrarTurmaDTO);
    }

 
    @Delete(':codigo_turma')
    @RemoverTurmaDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR)
    async deletar(
        @Param() removerTurmaDTO: RemoverTurmaDTO,
    ): Promise<any> {
        return await this.turmaService.deletar(removerTurmaDTO);
    }
    
    @Put('')
    @AlterarTurmaDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR)
    async atualizar(
        @Body() alterarTurmaDTO: AlterarTurmaDTO,
    ): Promise<any> {
        return await this.turmaService.alterar(alterarTurmaDTO);
    }

    @Get(':codigo_turma')
    @ObterTurmaDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async obter(
        @Param() obterTurmaDTO: ObterTurmaDTO,
    ): Promise<any> {
        return await this.turmaService.obter(obterTurmaDTO);
    }

    @Get('')
    @ListarTurmaDocs()
    @Roles(TipoUsuarioEnum.ADMIN)
    async listar(
        @Query() listarTurmaDTO: ListarTurmaDTO,
    ): Promise<any> {
        return await this.turmaService.listar(listarTurmaDTO);
    }
}

