import faker from '@faker-custom';
import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CustomApiProperty, Generate } from 'src/utils/generate/decorators';



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

// export function RemoverSalaDocs() {
//     return applyDecorators(
//         ApiTags('Sala'),
//         ApiBearerAuth(),
//         ApiOperation({ summary: 'Remover Sala' }),
//         ApiResponse({
//             status: 200,
//             description: 'Sala removida com sucesso',
//         }),
//     );
// }

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
    

//     export function ObterSalaDocs() {
//         return applyDecorators(
//             ApiTags('Sala'),
//             ApiBearerAuth(),
//             ApiOperation({ summary: 'Obter Sala' }),
//             ApiResponse({
//                 status: 200,
//                 description: 'Sala obtido com sucesso',
//                 // type: ObterSala200DTO,
//             }),
//         );
//     }

// export function ListarSalaDocs() {
//         return applyDecorators(
//             ApiTags('Sala'),
//             ApiBearerAuth(),
//             ApiOperation({ summary: 'Listar salas' }),
//             ApiResponse({
//                 status: 200,
//                 description: 'Salas listadas com sucesso',
                
//             }),
//         );
//     }
