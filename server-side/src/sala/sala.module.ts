import { Module } from '@nestjs/common';
import { SalaController } from './sala.controller';
import { SalaService } from './sala.service';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [SalaController],
  providers: [SalaService, PrismaService]
})
export class SalaModule {}


