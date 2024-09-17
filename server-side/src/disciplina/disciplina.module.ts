import { Module } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';

@Module({
  providers: [DisciplinaService],
  controllers: [DisciplinaController]
})
export class DisciplinaModule {}
