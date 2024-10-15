import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarDisciplinaDTO } from './dto/cadastrar-disciplina.dto';
import { AlterarDisciplinaDTO } from './dto/alterar-sala.dto';

@Injectable()
export class DisciplinaService {
    constructor(private prisma: PrismaService) {}

    async cadastrar(cadastrarDisciplinaDTO: CadastrarDisciplinaDTO): Promise<any> {

    const disciplina = await this.prisma.disciplina
      .create({
        data: cadastrarDisciplinaDTO,
        select: {
          disciplina_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  async alterar(alterarDisciplinaDTO: AlterarDisciplinaDTO): Promise<any> {

    const { codigo_disciplina, ...atualizarDisciplinaBDDTO } =
      alterarDisciplinaDTO;

    const desciplina = await this.prisma.disciplina
      .update({
        where: {
          codigo_disciplina: codigo_disciplina,
        },
        data: atualizarDisciplinaBDDTO,
        select: {
          codigo_disciplina: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });
    return {};
  }

  
}


