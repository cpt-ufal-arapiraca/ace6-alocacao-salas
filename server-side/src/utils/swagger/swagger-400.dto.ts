import {ApiProperty} from "@nestjs/swagger";

export class Swagger400DTO {

    @ApiProperty({
        example: 'Entidade Y não reconhecido no banco de dados',
        description: 'Descrição do erro'
    })
    message: string;

    @ApiProperty({
        example: 'Bad Request',
        description: 'Descrição do erro'
    })
    error: string;

    @ApiProperty({
        example: 400,
        description: 'Código de status HTTP'
    })
    statusCode: number;

}