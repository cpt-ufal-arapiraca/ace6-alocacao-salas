import {IsAlphanumeric, IsInt, IsOptional} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";

export class DeletarDisciplinaDTO {

    @CustomApiProperty({
        description: 'ID da disciplina',
        required: false,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @Type(() => String)
    @IsOptional()
    @IsAlphanumeric()
    disciplina_codigo?: string;

}