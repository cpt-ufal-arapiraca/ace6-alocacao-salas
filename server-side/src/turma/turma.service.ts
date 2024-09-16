import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CadastrarTurmaDTO } from './dto/cadastrar-turma.dto';
import { AlterarTurmaDTO } from './dto/alterar-turma.dto';


@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) {}

  async cadastrar(cadastrarTurmaDTO: CadastrarTurmaDTO): Promise<any> {

    const turma = await this.prisma.turma
      .create({
        data: cadastrarTurmaDTO,
        select: {
          turma_id: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

//   async deletar(removerSalaDTO: RemoverSalaDTO): Promise<any> {
//     const sala = await this.prisma.sala
//       .delete({
//         where: {
//           codigo_sala: removerSalaDTO.codigo_sala,
//         },
//         select: {
//           codigo_sala: true,
//         },
//       })
//       .catch((e) => {
//         throw this.prisma.tratamentoErros(e);
//       });

//     return {};
//   }

  async alterar(alterarTurmaDTO: AlterarTurmaDTO): Promise<any> {

    const { codigo_turma, ...atualizarTurmaBDDTO } =
      alterarTurmaDTO;

    const turma = await this.prisma.turma
      .update({
        where: {
          codigo_turma: codigo_turma,
        },
        data: atualizarTurmaBDDTO,
        select: {
          codigo_turma: true,
        },
      })
      .catch((e) => {
        throw this.prisma.tratamentoErros(e);
      });

    return {};
  }

  
//   async obter(obterSalaDTO: ObterSalaDTO): Promise<any> {

//     const sala = await this.prisma.sala
//       .findUnique({
//         where: {
//           codigo_sala: obterSalaDTO.codigo_sala,
//         },
//         select: {
//           sala_id: true,
//           codigo_sala: true,
//           tipo: true,
//           bloco: true,
//           capacidade: true,
//             // tipo_usuario: {
//             //     select: {
//             //         tipo_sala_id: true,
//             //         tipo_usuario_nome: true,
//             //     },
//             // },
//           },
//       })
//       .catch((e) => {
//         throw this.prisma.tratamentoErros(e);
//       });

//     if (!sala) {
//       throw new HttpException(
//         `Não é possível obter essa sala`,
//         HttpStatus.NOT_FOUND,
//       );
//     }

//     return sala;
//   }

//   // Revisar
//   async listar(listarSalaDTO: ListarSalaDTO): Promise<any> {
//     const salas = await this.prisma.sala
//       .findMany({
//         where: {
//           AND: [
//             listarSalaDTO.tipo
//               ? {
//                   tipo: listarSalaDTO.tipo,
//                 }
//               : {},
//               listarSalaDTO.codigo_sala
//               ? {
//                   codigo_sala: {
//                     startsWith: listarSalaDTO.codigo_sala,
//                   },
//                 }
//               : {},
//               // listarSalaDTO.usuario_nome
//               // ? {
//               //     usuario_nome: {
//               //       contains: listarSalaDTO.usuario_nome,
//               //     },
//               //   }
//               // : {},
//           ],
//         },
//         skip: listarSalaDTO.pagina ? (listarSalaDTO.pagina - 1) * 10 : undefined,
//         take: 10,
//         orderBy: {
//           codigo_sala: listarSalaDTO.ordenacao,
//         },
//         select: {
//           sala_id: true,
//           codigo_sala: true,
//           tipo: true,
//           bloco: true,
//           capacidade: true,
//           // tipo_usuario: {
//           //   select: {
//           //       tipo_sala_id: true,
//           //       tipo_usuario_nome: true,
//           //   },
//           // },
//         },
//       })
//       .catch((e) => {
//         throw this.prisma.tratamentoErros(e);
//       });

//       const totalSalas = await this.prisma.usuario.count();

//       return {
//           total: totalSalas,
//           pagina: listarSalaDTO.pagina,
//           quantidade: Math.ceil(totalSalas/10),
//           salas: salas,
//       };

//   }
}
