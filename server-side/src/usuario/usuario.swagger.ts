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

export function AtualizarUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Atualizar usuário' }),
        ApiResponse({
            status: 200,
            description: 'Usuário atualizar com sucesso',
        }),
    );
}

export function ObterUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Obter usuário' }),
        ApiResponse({
            status: 200,
            description: 'Usuário obtido com sucesso',
        }),
    );
}