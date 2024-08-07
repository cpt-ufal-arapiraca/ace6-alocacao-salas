import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

export function CadastrarUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Cadastrar usuário ao sistema' }),
        ApiResponse({
            status: 201,
            description: 'Usuário cadastrar com sucesso',
        }),
    );
}