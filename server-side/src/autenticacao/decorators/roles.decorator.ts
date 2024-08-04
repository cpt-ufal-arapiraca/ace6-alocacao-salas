import { SetMetadata } from '@nestjs/common';
import {TipoUsuarioEnum} from "../enum/tipos-usuarios-autenticacao.enum";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TipoUsuarioEnum[]) => SetMetadata(ROLES_KEY, roles);