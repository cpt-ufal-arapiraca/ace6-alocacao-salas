import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

export function AdicionarUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'adicionar usuário ao sistema' }),
        ApiResponse({
            status: 201,
            description: 'Usuário adicionado com sucesso',
        }),
    );
}

export function CadastrarUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiOperation({ summary: 'Cadastrar usuário' }),
        ApiResponse({
            status: 201,
            description: 'Usuário cadastrar com sucesso',
        }),
    );
}