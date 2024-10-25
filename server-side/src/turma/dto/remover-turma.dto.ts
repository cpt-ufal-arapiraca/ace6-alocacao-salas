import {IsInt, IsOptional} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";

export class RemoverTurmaDTO {

    @CustomApiProperty({
        description: 'Código da turma',
        required: false,
    })
    @Generate(() => faker.string.numeric())
    @Type(() => String)
    @IsOptional()
    turma_codigo?: string;

    
}