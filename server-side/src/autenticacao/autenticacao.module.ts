import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s'},
    }),
  ],
  providers: [AutenticacaoService, PrismaService],
  controllers: [AutenticacaoController]
})
export class AutenticacaoModule {}
