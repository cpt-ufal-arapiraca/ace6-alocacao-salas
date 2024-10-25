import {IsInt, IsOptional, IsString} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";

export class RemoverSalaDTO {

    @CustomApiProperty({
        description: 'Código da sala',
        required: false,
    })
    @Generate(() => faker.string.numeric())
    @Type(() => String)
    @IsOptional()
    @IsString()
    sala_codigo?: string;

    
}