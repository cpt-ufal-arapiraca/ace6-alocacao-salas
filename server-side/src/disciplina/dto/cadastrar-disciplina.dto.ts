import {IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";


export class CadastrarDisciplinaDTO {

    @CustomApiProperty({
        description: 'Código da Disciplina',
        required: true,
    })
    @Generate(() => faker.number.int())
    @IsNumberString()
    @IsNotEmpty()
    codigo_disciplina : string;

    @CustomApiProperty({
        description: 'Nome da disciplina',
        required: true,
    })
    @Generate(() => faker.person.firstName())
    nome: string;

    @CustomApiProperty({
        description: 'Curso da disciplina',
        required: true,
    })
    @Generate(() => faker.lorem.words())
    @IsString()
    @IsNotEmpty()
    curso : string;

    @CustomApiProperty({
        description: 'Periodo',
        required: true,
    })
    @Generate(() => faker.number.int({min: 1, max: 15}))
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    periodo : number;

    @CustomApiProperty({
        description: 'PPCA',
        required: true,
    })
    @Generate(() => faker.string.alphanumeric())
    @IsString()
    @IsNotEmpty()
    PPCA : string;
}