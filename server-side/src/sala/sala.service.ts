import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarSalaDTO } from './dto/cadastrar-sala.dto';

@Injectable()
export class SalaService {
  constructor(private prisma: PrismaService) {}

  async cadastrar(cadastrarSalaDTO: CadastrarSalaDTO): Promise<any> {

    const sala = await this.prisma.sala
      .create({
        data: cadastrarSalaDTO,
        select: {
          sala_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }
}
