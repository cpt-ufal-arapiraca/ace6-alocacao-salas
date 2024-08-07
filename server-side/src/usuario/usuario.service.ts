import { Injectable } from '@nestjs/common';
import {PrismaService} from "../utils/prisma/prisma.service";

@Injectable()
export class UsuarioService {
    constructor(
        private prisma: PrismaService,
    ) {}



}
