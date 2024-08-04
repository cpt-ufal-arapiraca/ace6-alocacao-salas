import {ApiProperty} from "@nestjs/swagger";

export class Swagger422DTO {

    @ApiProperty({
        example: [
            'O campo Y deve conter um valor válido.',
            'O campo Z é obrigatório.'
        ],
        description: 'Mensagem de erro'
    })
    message: string[];

    @ApiProperty({
        example: 'Unprocessable Content',
        description: 'Descrição do erro'
    })
    error: string;

    @ApiProperty({
        example: 422,
        description: 'Código de status HTTP'
    })
    statusCode: number;

}