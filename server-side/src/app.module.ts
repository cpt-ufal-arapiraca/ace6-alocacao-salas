import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import {GenerateModule} from "./utils/generate/generate.module";
import {AppContoller} from "./app.controller";
import { AdministradorModule } from './administrador/administrador.module';

@Module({
  imports: [AutenticacaoModule, GenerateModule, PrismaModule, AdministradorModule],
  controllers: [AppContoller],
  providers: [AppService],
})
export class AppModule {}
