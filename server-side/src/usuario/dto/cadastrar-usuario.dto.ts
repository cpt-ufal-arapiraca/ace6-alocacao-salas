import {IsEmail, IsInt, IsNotEmpty, IsOptional, IsStrongPassword, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {CpfValido, NomeValido} from "@validate-custom";
import {Type} from "class-transformer";

export class CadastrarUsuarioDTO {

    @CustomApiProperty({
        description: 'Nome do usuário',
        required: true,
    })
    @Generate(() => faker.person.fullName())
    @IsNotEmpty()
    @Validate(NomeValido)
    usuario_nome : string;

    @CustomApiProperty({
        description: 'CPF do usuário',
        required: true,
    })
    @Generate(() => faker.custom.cpf())
    @IsNotEmpty()
    @Validate(CpfValido)
    usuario_cpf : string;

    @CustomApiProperty({
        description: 'Siape do usuário',
        required: true,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @IsInt()
    usuario_siape : number;

    @CustomApiProperty({
        description: 'Email do usuário',
        required: true,
    })
    @Generate(() => faker.internet.email())
    @IsNotEmpty()
    @IsEmail()
    usuario_email : string;

    @CustomApiProperty({
        description: 'Senha do usuário',
        required: true,
    })
    @Generate(() => 'Teste123@')
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    autenticacao_senha: string;

    usuario_situacao: string;

}