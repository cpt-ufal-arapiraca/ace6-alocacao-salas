import 'reflect-metadata';
import {IsNotEmpty, IsString, IsStrongPassword, Validate} from 'class-validator';
import faker from '@faker-custom';
import {CustomApiProperty, Generate} from "@decorators-custom";
import {CpfValido} from "@validate-custom";

export class EntrarAutenticacaoDTO {

    @CustomApiProperty({
        description: 'CPF do usuário',
        required: true,
    })
    @Generate(() => faker.custom.cpf())
    @IsNotEmpty()
    @Validate(CpfValido)
    usuario_cpf: string;

    @CustomApiProperty({
        description: 'Senha do usuário',
        required: true,
    })
    @Generate(() => faker.custom.senha(8))
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    autenticacao_senha: string;

    sessao_so: string;

    sessao_ip: string;

}
