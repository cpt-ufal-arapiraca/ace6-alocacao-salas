import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarDisciplinaDTO } from './dto/cadastrar-disciplina.dto';

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
}
