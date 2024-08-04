import 'reflect-metadata';
import {IsNotEmpty, IsString, IsStrongPassword, Validate} from 'class-validator';
import faker from '@faker-custom';
import {CustomApiProperty, Generate} from "@decorators-custom";
import {CpfValido} from "@validate-custom";

export class EntrarAutenticacaoDTO {

    @CustomApiProperty({
        description: 'CPF do enfermeiro',
        required: true,
    })
    @Generate(() => faker.custom.cpf())
    @IsNotEmpty()
    @Validate(CpfValido)
    enf_cpf: string;

    @CustomApiProperty({
        description: 'CPF do enfermeiro',
        required: false,
    })
    @Generate(() => faker.person.fullName())
    @IsNotEmpty()
    @IsString()
    enf_nome: string;

    @Generate(() => faker.custom.senha(8))
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    enf_senha: string;


    enf_id: number;
}
