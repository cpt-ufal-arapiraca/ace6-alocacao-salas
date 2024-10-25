import {IsEnum, IsIn, IsInt, IsOptional, IsString, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";


export class ListarDisciplinaDTO {

    @CustomApiProperty({
        description: 'Codigo da disciplina',
        required: false,
    })
    @IsOptional()
    disciplina_codigo?: string;


    @CustomApiProperty({
        description: 'Nome da disciplina',
        required: false,
    })
    @IsOptional()
    disciplina_nome: string;


    @CustomApiProperty({
        description: 'Curso da disciplina',
        required: false,
    })
    @IsString()
    @IsOptional()
    disciplina_curso : string;


    @CustomApiProperty({
        description: 'Valor para paginação',
        required: false,
    })
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    pagina?: number

    @CustomApiProperty({
        description: 'ordenação das disciplinas',
        enum: ['asc', 'desc'],
        required: false,
    })
    @Generate(() => faker.helpers.arrayElement(['asc', 'desc']))
    @IsOptional()
    @IsIn(['asc', 'desc'])
    ordenacao?: 'asc' | 'desc';

}