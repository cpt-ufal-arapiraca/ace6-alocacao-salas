import { applyDecorators } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

export function CadastrarAdministradorDocs() {
    return applyDecorators(
        ApiTags('Administrador'),
        ApiOperation({ summary: 'Realizar cadastro do administrador' }),
        ApiResponse({
            status: 201,
            description: 'Administrador cadastrado com sucesso',
        }),
    );
}

export function ObterExistenciaAdministradorDocs() {
    return applyDecorators(
        ApiTags('Administrador'),
        ApiOperation({ summary: 'Verificar se existe um administrador no sistema' }),
        ApiResponse({
            status: 200,
            description: 'Administrador verificado com sucesso',
        }),
    );
}