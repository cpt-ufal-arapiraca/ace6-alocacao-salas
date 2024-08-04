import {ApiProperty} from "@nestjs/swagger";

export class Swagger401DTO {

    @ApiProperty({
        example: 'Sessão inválida: as credenciais não foram encontradas ou a sessão expirou.',
        description: 'Descrição do erro'
    })
    message: string;

    @ApiProperty({
        example: 'Unauthorized',
        description: 'Descrição do erro'
    })
    error: string;

    @ApiProperty({
        example: 401,
        description: 'Código de status HTTP'
    })
    statusCode: number;

}