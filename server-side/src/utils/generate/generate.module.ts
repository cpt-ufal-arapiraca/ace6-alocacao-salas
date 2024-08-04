import { Module } from '@nestjs/common';
import {GenerateService} from "./generate.service";

@Module({
  imports: [],
  controllers: [],
  providers: [GenerateService],
})
export class GenerateModule {}
