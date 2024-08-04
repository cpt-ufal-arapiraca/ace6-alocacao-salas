import {ApiProperty} from "@nestjs/swagger";

export class Swagger500DTO {

    @ApiProperty({
        example: 'Internal Server Error',
        description: 'Descrição do erro'
    })
    message: string;

    @ApiProperty({
        example: 'Internal Server Error',
        description: 'Descrição do erro'
    })
    error: string;

    @ApiProperty({
        example: 500,
        description: 'Código de status HTTP'
    })
    statusCode: number;

}