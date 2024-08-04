import {ApiProperty} from "@nestjs/swagger";

export class Swagger403DTO {

    @ApiProperty({
        example: 'Acesso não autorizado: X pessoa não tem permissão para acessar Y recurso.',
        description: 'Descrição do erro'
    })
    message: string;

    @ApiProperty({
        example: 'Forbidden',
        description: 'Descrição do erro'
    })
    error: string;

    @ApiProperty({
        example: 403,
        description: 'Código de status HTTP'
    })
    statusCode: number;

}