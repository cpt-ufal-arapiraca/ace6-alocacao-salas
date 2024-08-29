import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SalaService } from './sala.service';
import { Roles } from 'src/autenticacao/decorators/roles.decorator';
import { TipoUsuarioEnum } from 'src/autenticacao/enum/tipo-usuario-autenticacao.enum';
import { CadastrarSalaDTO } from './dto/cadastrar-sala.dto';
import { CadastrarSalaDocs, RemoverSalaDocs } from './sala.swagger';
import { RemoverSalaDTO } from './dto/remover-sala.dto';

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
    
}
