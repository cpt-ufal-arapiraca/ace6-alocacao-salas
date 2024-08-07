import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {TipoUsuarioEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";

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

class TipoUsuarioAutenticacao200DTO {

    @CustomApiProperty({
        description: 'Tipo do usuário',
    })
    @Generate(() => faker.helpers.arrayElement([...Object.values(TipoUsuarioEnum)]))
    tipo_usuario_nome: string;
}
class ObterAutenticacao200DTO {

    @CustomApiProperty({
        description: 'ID do usuário',
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    usuario_id: string;

    @CustomApiProperty({
        description: 'Nome do usuário',
    })
    @Generate(() => faker.person.fullName())
    usuario_nome: string;
    @CustomApiProperty({
        description: 'CPF do usuário',
    })
    @Generate(() => faker.custom.cpf())
    usuario_cpf: string;

    @CustomApiProperty({
        description: 'Email do usuário',
    })
    @Generate(() => faker.internet.email())
    usuario_email: string;

    @CustomApiProperty({
        description: 'Tipo do usuário',
    })
    tipo_usuario: TipoUsuarioAutenticacao200DTO;
}

export function ObterUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Obter usuário' }),
        ApiResponse({
            status: 200,
            description: 'Usuário obtido com sucesso',
            type: ObterAutenticacao200DTO,
        }),
    );
}


class ListarUsuarioAutenticacao200DTO {

    @CustomApiProperty({
        description: 'Cursor para rolagem infinita',
    })
    @Generate(() => faker.number.int({min:1, max: 10}))
    cursor: number;

    @CustomApiProperty({
        type: [ObterAutenticacao200DTO],
        description: 'Listar de usuários',
    })
    data: ObterAutenticacao200DTO[];
}

export function ListarUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Listar usuários' }),
        ApiResponse({
            status: 200,
            description: 'Usuário listados com sucesso',
            type: ListarUsuarioAutenticacao200DTO,
        }),
    );
}