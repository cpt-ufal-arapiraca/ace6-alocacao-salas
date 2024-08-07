import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

export function AdicionarUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuário'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Adicionar usuário ao sistema' }),
        ApiResponse({
            status: 201,
            description: 'Usuário adicionado com sucesso',
        }),
    );
}