import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SalaService } from './sala.service';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { TipoUsuarioEnum } from 'src/autenticacao/enum/tipo-usuario-autenticacao.enum';
import { CadastrarSalaDTO } from './dto/cadastrar-sala.dto';
import { AlterarSalaDocs, CadastrarSalaDocs, RemoverSalaDocs } from './sala.swagger';
import { RemoverSalaDTO } from './dto/remover-sala.dto';
import { AlterarSalaDTO } from './dto/alterar-sala.dto';
import { ObterSalaDTO } from './dto/obter-sala.dto';

@Controller('sala')
export class SalaController {
    constructor(
        private salaService: SalaService,
    ) {}
    @Post('')
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE)
    @CadastrarSalaDocs()
    async cadastrar(
        @Body() cadastrarSalaDTO: CadastrarSalaDTO,
    ): Promise<any> {
        return await this.salaService.cadastrar(cadastrarSalaDTO);
    }

 
    @Delete(':codigo_sala')
    @RemoverSalaDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR)
    async deletar(
        @Param() removerSalaDTO: RemoverSalaDTO,
    ): Promise<any> {
        return await this.salaService.deletar(removerSalaDTO);
    }
    
    @Put('')
    @AlterarSalaDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR)
    async atualizar(
        @Body() alterarSalaDTO: AlterarSalaDTO,
    ): Promise<any> {
        return await this.salaService.alterar(alterarSalaDTO);
    }

    @Get(':codigo_sala')
    // @ObterUsuarioDocs()
    @Roles(TipoUsuarioEnum.ADMIN, TipoUsuarioEnum.GERENTE, TipoUsuarioEnum.COORDENADOR, TipoUsuarioEnum.PROFESSOR)
    async obter(
        @Param() obterSalaDTO: ObterSalaDTO,
    ): Promise<any> {
        return await this.salaService.obter(obterSalaDTO);
    }
}
