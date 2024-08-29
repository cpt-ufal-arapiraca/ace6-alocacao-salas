import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';



export function CadastrarSalaDocs() {
    return applyDecorators(
        ApiTags('Sala'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Cadastrar Sala' }),
        ApiResponse({
            status: 201,
            description: 'Sala cadastrada com sucesso',
        }),
    );
    
    
}

export function RemoverSalaDocs() {
    return applyDecorators(
        ApiTags('Sala'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Remover Sala' }),
        ApiResponse({
            status: 200,
            description: 'Sala removida com sucesso',
        }),
    );
}


