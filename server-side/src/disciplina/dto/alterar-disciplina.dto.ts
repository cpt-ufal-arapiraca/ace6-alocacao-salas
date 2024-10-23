import {IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import { Type } from 'class-transformer';


export class AlterarDisciplinaDTO {

    @CustomApiProperty({
        description: 'Código Disciplina',
        required: false,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @IsOptional()
    @IsString()
    disciplina_codigo : string;


    @CustomApiProperty({
        description: 'Nome da disciplina',
        required: true,
    })
    @Generate(() => faker.person.firstName())
    disciplina_nome: string;


    @CustomApiProperty({
        description: 'Curso da disciplina',
        required: true,
    })
    @Generate(() => faker.lorem.words())
    @IsString()
    @IsNotEmpty()
    disciplina_curso : string;


   @CustomApiProperty({
        description: 'Periodo',
        required: true,
    })
    @Generate(() => faker.number.int({min: 1, max: 15}))
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    disciplina_periodo : number;

// O QUE EU TO FAZENDO AQUIIIII - OLHE A LINHA 

    @CustomApiProperty({
        description: 'PPC',
        required: true,
    })
    @Generate(() => faker.string.alphanumeric())
    @IsString()
    @IsNotEmpty()
    disciplina_PPCA : string;


}