import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CustomApiProperty, Generate} from "@decorators-custom";

class EntrarAutenticacao200DTO {

    @ApiProperty({
        description: 'Token JWT da sessão',
    })
    access_token: string;

}

export class RecuperarSenhaAutenticacaoSwagger200DTO {

    @CustomApiProperty({
        description: 'Token para redefinir a senha',
    })
    @Generate(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
    autenticacao_senha: string;

}

export function EntrarAutenticacaoDocs() {
    return applyDecorators(
        ApiTags('Autenticacao'),
        ApiOperation({ summary: 'Realizar login do usuário' }),
        ApiResponse({
            status: 201,
            description: 'Usuário logado',
            type: EntrarAutenticacao200DTO,
        }),
    );
}

export function SairAutenticacaoDocs() {
    return applyDecorators(
        ApiTags('Autenticacao'),
        ApiOperation({ summary: 'Realizar logout do usuário' }),
        ApiResponse({
            status: 200,
            description: 'Sessão removida com sucesso',
        }),
    );
}

export function AlterarSenhaAutenticacaoDocs() {
    return applyDecorators(
        ApiTags('Autenticacao'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Alterar senha do usuário' }),
        ApiResponse({
            status: 200,
            description: 'Senha alterada com sucesso',
        }),
    );
}

export function RecuperarSenhaAutenticacaoDocs() {
    return applyDecorators(
        ApiTags('Autenticacao'),
        ApiOperation({ summary: 'Gerar token para redefinição de senha do usuário' }),
        ApiResponse({
            status: 200,
            description: 'Token gerado com sucesso',
            type: RecuperarSenhaAutenticacaoSwagger200DTO,
        }),
    );
}

