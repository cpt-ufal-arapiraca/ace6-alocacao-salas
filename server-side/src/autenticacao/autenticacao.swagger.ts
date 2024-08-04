import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags} from '@nestjs/swagger';
class EntrarAutenticacao200DTO {

    @ApiProperty({
        description: 'ID do enfermeiro',
    })
    enf_id: number;

    @ApiProperty({
        description: 'CPF do enfermeiro',
    })
    enf_cpf: string;

    @ApiProperty({
        description: 'Nome do enfermeiro',
    })
    enf_nome: string;
}
export function EntrarAutenticacaoDocs() {
    return applyDecorators(
        ApiTags('Autenticacao'),
        ApiOperation({ summary: 'Realizar login do enfermeiro' }),
        ApiResponse({
            status: 201,
            description: 'Enfermeiro logado',
            type: EntrarAutenticacao200DTO,
        }),
    );
}

