import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { ROLES_KEY } from './decorators/roles.decorator';
import { TipoUsuarioEnum } from "./enum/tipo-usuario-autenticacao.enum";
import { PrismaService } from "../utils/prisma/prisma.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<TipoUsuarioEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);



        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new HttpException(
                'As credenciais de acesso não estão sendo enviadas.',
                HttpStatus.UNAUTHORIZED,
            );
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request['usuario_tipo'] = payload.role;
            request['usuario_id'] = payload.sub;
            request['sessao_jwt'] = token;
        } catch (e) {
            throw new HttpException(
                'As credenciais fornecidas são inválidas.',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const isToken = await this.prisma.sessao.findUnique({
            where: {
                sessao_jwt: token,
            }
        }).catch((e) => {
            throw this.prisma.tratamentoErros(e);
        });

        if (!isToken) {
            throw new HttpException(
                'Sessão inválida: as credenciais não foram encontradas ou a sessão expirou.',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const userRole = request['usuario_tipo'];
        if (requiredRoles.includes(userRole)) {
            return true;
        } else {
            throw new HttpException(
                'Acesso não autorizado: você não tem permissão para acessar este recurso.',
                HttpStatus.FORBIDDEN,
            );
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
