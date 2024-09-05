import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import {GenerateModule} from "./utils/generate/generate.module";
import {AppController} from "./app.controller";
import { AdministradorModule } from './administrador/administrador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SalaModule } from './sala/sala.module';

@Module({
  imports: [AutenticacaoModule, GenerateModule, PrismaModule, AdministradorModule, UsuarioModule, SalaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
