import {IsEnum, IsIn, IsInt, IsOptional, IsString, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";
import { TipoSalaEnum } from '../enum/tipo-sala.enum';

export class ListarSalaDTO {

    @CustomApiProperty({
        description: 'Codigo da Sala',
        required: false,
    })
    @Generate(() => faker.number.int())
    @IsOptional()
    sala_codigo?: string;

    @CustomApiProperty({
        description: 'Tipo de Sala (Laboratorio ou Sala)',
        required: false,
    })

    // Revisar essa parte
    @Generate(() => faker.helpers.arrayElement([...Object.values(TipoSalaEnum)]))
    @Type(() => String)
    @IsOptional()
    @IsEnum(TipoSalaEnum)
    @IsString()
    sala_tipo ?: TipoSalaEnum;

    @CustomApiProperty({
        description: 'Valor para paginação',
        required: false,
    })
    @Generate(() => faker.number.int({min:1, max: 10}))
    @Type(() => Number)
    @IsOptional()
    @IsInt()
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