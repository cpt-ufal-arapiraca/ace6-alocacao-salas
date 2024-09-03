import {IsEmail, IsEnum, IsInt, IsOptional, IsString, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";


export class AlterarSalaDTO {

    @CustomApiProperty({
        description: 'Código Sala',
        required: false,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @IsOptional()
    @IsString()
    codigo_sala : string;

    @CustomApiProperty({
        description: 'Tipo da Sala',
        required: false,
    })
    @Generate(() => faker.string.alpha())
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