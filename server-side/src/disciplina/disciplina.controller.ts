import { Body, Controller, Post } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { TipoUsuarioEnum } from 'src/autenticacao/enum/tipo-usuario-autenticacao.enum';
import { CadastrarDisciplinaDTO } from './dto/cadastrar-sala.dto';
import { CadastrarDisciplinaDocs } from './disciplina.swagger';

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

}
