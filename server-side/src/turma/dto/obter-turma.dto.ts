import { IsAlphanumeric, IsInt, IsOptional} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";

export class ObterTurmaDTO {

    @CustomApiProperty({
        description: 'Código da Turma',
        required: false,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @Type(() => String)
    @IsOptional()
    @IsAlphanumeric()
    turma_codigo?: string;

}