import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags} from '@nestjs/swagger';
class EntrarAutenticacao200DTO {

    @ApiProperty({
        description: 'Token JWT da sessão',
    })
    access_token: string;

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

