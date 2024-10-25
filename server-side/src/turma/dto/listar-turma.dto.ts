import {IsEnum, IsIn, IsInt, IsOptional, IsString, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";
import { TipoTurmaEnum } from '../enum/tipo-turma.enum';


export class ListarTurmaDTO {

    @CustomApiProperty({
        description: 'Id da turma',
        required: false,
    })
    @Generate(() => faker.number.int())
    @IsOptional()
    id_turma?: number;

    @CustomApiProperty({
        description: 'Codigo da Turma',
        required: false,
    })
    @Generate(() => faker.number.int())
    @IsOptional()
    turma_codigo?: string;

    @CustomApiProperty({
        description: 'Tipo de Sala (Laboratorio ou Sala)',
        required: false,
    })
    // Revisar essa parte
    @Generate(() => faker.helpers.arrayElement([...Object.values(TipoTurmaEnum)]))
    @Type(() => String)
    @IsOptional()
    @IsEnum(TipoTurmaEnum)
    @IsString()
    turma_tipo ?: TipoTurmaEnum;

    @CustomApiProperty({
        description: 'Valor para paginação',
        required: false,
    })
    @Generate(() => faker.number.int({min:1, max: 10}))
    @Type(() => Number)
    @IsOptional()
    pagina?: number

    @CustomApiProperty({
        description: 'ordenação das sala',
        enum: ['asc', 'desc'],
        required: false,
    })
    @Generate(() => faker.helpers.arrayElement(['asc', 'desc']))
    @IsOptional()
    @IsIn(['asc', 'desc'])
    ordenacao?: 'asc' | 'desc';

}