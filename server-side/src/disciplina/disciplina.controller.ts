import { Body, Controller, Post, Put } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { TipoUsuarioEnum } from 'src/autenticacao/enum/tipo-usuario-autenticacao.enum';
import { CadastrarDisciplinaDTO } from './dto/cadastrar-disciplina.dto';
import { AlterarDisciplinaDocs, CadastrarDisciplinaDocs } from './disciplina.swagger';
import { AlterarDisciplinaDTO } from './dto/alterar-sala.dto';


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
}
