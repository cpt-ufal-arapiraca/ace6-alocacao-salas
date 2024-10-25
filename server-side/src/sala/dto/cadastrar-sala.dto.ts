import {IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import { TipoSalaEnum } from '../enum/tipo-sala.enum';
import {TipoUsuarioIndexEnum} from "../../autenticacao/enum/tipo-usuario-autenticacao.enum";
import {Type} from "class-transformer";

export class CadastrarSalaDTO {

    @CustomApiProperty({
        description: 'Código da Sala',
        required: true,
    })
    @Generate(() => faker.number.int())
    @IsNumberString()
    @IsNotEmpty()
    sala_codigo : string;

    @CustomApiProperty({
        description: 'Tipo da sala',
        enum: TipoSalaEnum,
        required: true,
    })
    @Generate(() => faker.helpers.arrayElement(Object.values(TipoSalaEnum).slice(Math.ceil(Object.values(TipoSalaEnum).length / 2))))
    @IsEnum(TipoSalaEnum)
    sala_tipo: TipoSalaEnum;

    @CustomApiProperty({
        description: 'Bloco da Sala',
        required: true,
    })
    @Generate(() => faker.string.alpha())
    @IsString()
    @IsNotEmpty()
    sala_bloco : string;

    @CustomApiProperty({
        description: 'Bloco da Sala',
        required: true,
    })
    @Generate(() => faker.number.int())
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    sala_capacidade : number;

}