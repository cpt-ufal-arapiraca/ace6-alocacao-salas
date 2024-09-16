import faker from '@faker-custom';
import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';


export function CadastrarTurmaDocs() {
    return applyDecorators(
        ApiTags('Turma'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Cadastrar Turma' }),
        ApiResponse({
            status: 201,
            description: 'Turma cadastrada com sucesso',
        }),
    );
}

export function RemoverTurmaDocs() {
    return applyDecorators(
        ApiTags('Turma'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Remover Turma' }),
        ApiResponse({
            status: 200,
            description: 'Turma removida com sucesso',
        }),
    );
}

export function AlterarTurmaDocs() {
        return applyDecorators(
            ApiTags('Turma'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Atualizar turma' }),
            ApiResponse({
                status: 200,
                description: 'Turma alterada com sucesso',
            }),
        );
    }    
    

export function ObterTurmaDocs() {
    return applyDecorators(
        ApiTags('Turma'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Obter Turma' }),
        ApiResponse({
            status: 200,
            description: 'Turma obtido com sucesso',
            // type: ObterTurma200DTO,
        }),
    );
}

export function ListarTurmaDocs() {
        return applyDecorators(
            ApiTags('Turma'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Listar turmas' }),
            ApiResponse({
                status: 200,
                description: 'Turmas listadas com sucesso',
                
            }),
        );
    }
