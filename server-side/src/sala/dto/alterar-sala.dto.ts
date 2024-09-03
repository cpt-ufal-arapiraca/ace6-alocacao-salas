import {IsEmail, IsEnum, IsInt, IsOptional, IsString, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {NomeValido} from "@validate-custom";
import {TipoUsuarioIndexEnum} from "../../autenticacao/enum/tipo-usuario-autenticacao.enum";
import {Type} from "class-transformer";

export class AlterarSalaDTO {

    @CustomApiProperty({
        description: 'Código Sala',
        required: false,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @IsOptional()
    @IsString()
    codigo_sala : number;

    @CustomApiProperty({
        description: 'Tipo da Sala',
        required: false,
    })
    @Generate(() => faker.person.fullName())
    @IsOptional()
    tipo : string;

    @CustomApiProperty({
        description: 'Bloco da Sala',
        required: false,
    })
    @Generate(() => faker.string.fromCharacters(['a', 'b', 'c']))
    @IsOptional()
    @IsString()
    bloco : string;

    @CustomApiProperty({
        description: 'Capacidade da Sala',
        required: false,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @IsOptional()
    @IsInt()
    capacidade : number;

    // Sala_a_ser_alterada: string;?

}