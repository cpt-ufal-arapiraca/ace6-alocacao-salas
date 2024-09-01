import {IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import { TipoSalaEnum } from '../enum/tipo-sala.enum';
import {TipoUsuarioIndexEnum} from "../../autenticacao/enum/tipo-usuario-autenticacao.enum";

export class CadastrarSalaDTO {

    @CustomApiProperty({
        description: 'Código da Sala',
        required: true,
    })
    @Generate(() => faker.number.int())
    @IsNumberString()
    @IsNotEmpty()
    codigo_sala : string;

    @CustomApiProperty({
        description: 'Tipo da sala',
        enum: TipoSalaEnum,
        required: true,
    })
    @Generate(() => faker.helpers.arrayElement(Object.values(TipoSalaEnum).slice(Math.ceil(Object.values(TipoSalaEnum).length / 2))))
    @IsEnum(TipoSalaEnum)
    tipo: TipoSalaEnum;

    @CustomApiProperty({
        description: 'Bloco da Sala',
        required: true,
    })
    @Generate(() => faker.string.alpha())
    @IsString()
    @IsNotEmpty()
    bloco : string;

    @CustomApiProperty({
        description: 'Bloco da Sala',
        required: true,
    })
    @Generate(() => faker.number.int())
    @Length(3)
    @IsInt()
    @IsNotEmpty()
    capacidade : number;

}