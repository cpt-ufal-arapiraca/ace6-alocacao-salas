import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';

@Module({
  providers: [AutenticacaoService],
  controllers: [AutenticacaoController]
})
export class AutenticacaoModule {}
