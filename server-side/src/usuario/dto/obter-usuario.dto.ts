import { IsInt, IsOptional} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";

export class ObterUsuarioDTO {

    @CustomApiProperty({
        description: 'ID do usuário',
        required: false,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    usuario_id?: number;

}