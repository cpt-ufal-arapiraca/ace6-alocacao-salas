import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {TipoUsuarioEnum, TipoUsuarioIndexEnum} from "../autenticacao/enum/tipo-usuario-autenticacao.enum";

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

class TipoUsuario2Autenticacao200DTO {

    @CustomApiProperty({
        description: 'Tipo do usuário ID',
    })
    @Generate(() => faker.helpers.arrayElement([...Object.values(TipoUsuarioIndexEnum)]))
    tipo_usuario_id: number;

    @CustomApiProperty({
        description: 'Tipo do usuário nome',
    })
    @Generate(() => faker.helpers.arrayElement([...Object.values(TipoUsuarioEnum)]))
    tipo_usuario_nome: string;

}

class TipoUsuarioAutenticacao200DTO {

    @CustomApiProperty({
        description: 'Tipo do usuário',
    })
    @Generate(() => faker.helpers.arrayElement([...Object.values(TipoUsuarioEnum)]))
    tipo_usuario_nome: string;
}
class ObterUsuario200DTO {

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
    tipo_usuario: TipoUsuario2Autenticacao200DTO;
}

export function ObterUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Obter usuário' }),
        ApiResponse({
            status: 200,
            description: 'Usuário obtido com sucesso',
            type: ObterUsuario200DTO,
        }),
    );
}
class ListarUsuarioAutenticacao200DTO {

    @CustomApiProperty({
        description: 'Total de usuários',
    })
    @Generate(() => faker.number.int({min:1, max: 100}))
    total: number;

    @CustomApiProperty({
        description: 'Valor de paginação atual',
    })
    @Generate(() => faker.number.int({min:1, max: 10}))
    pagina: number;

    @CustomApiProperty({
        description: 'Quantidade de total de páginas',
    })
    @Generate(() => 10)
    quantidade: number;

    @CustomApiProperty({
        type: [ObterUsuario200DTO],
        description: 'Lista de usuários',
    })
    usuarios: ObterUsuario200DTO[];
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

export function DeletarUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Deletar usuário' }),
        ApiResponse({
            status: 200,
            description: 'Usuário deletado com sucesso',
        }),
    );
}

export function ListarTipoUsuarioDocs() {
    return applyDecorators(
        ApiTags('Usuario'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Listar tipos de usuários' }),
        ApiResponse({
            status: 200,
            description: 'Tipos de usuário listados com sucesso',
            type: [TipoUsuario2Autenticacao200DTO],
        }),
    );
}