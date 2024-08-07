import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import {PrismaService} from "../utils/prisma/prisma.service";

@Module({
  providers: [AdministradorService, PrismaService],
  controllers: [AdministradorController]
})
export class AdministradorModule {}
