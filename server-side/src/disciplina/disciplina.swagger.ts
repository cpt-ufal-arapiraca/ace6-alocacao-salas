import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

export function CadastrarDisciplinaDocs() {
    return applyDecorators(
        ApiTags('Disciplina'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Cadastrar Disciplina' }),
        ApiResponse({
            status: 201,
            description: 'Disciplina cadastrada com sucesso',
        }),
    );
}

export function AlterarDisciplinaDocs() {
    return applyDecorators(
        ApiTags('Disciplina'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Atualizar disciplina' }),
        ApiResponse({
            status: 200,
            description: 'Disciplina alterada com sucesso',
        }),
    );
}    