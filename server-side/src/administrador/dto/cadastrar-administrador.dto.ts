import {IsEmail, IsNotEmpty, IsStrongPassword, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {CpfValido, NomeValido} from "@validate-custom";

export class CadastrarAdministradorDto {

    @CustomApiProperty({
        description: 'Nome do administrador',
        required: true,
    })
    @Generate(() => faker.person.fullName())
    @IsNotEmpty()
    @Validate(NomeValido)
    usuario_nome : string;

    @CustomApiProperty({
        description: 'CPF do administrador',
        required: true,
    })
    @Generate(() => faker.custom.cpf())
    @IsNotEmpty()
    @Validate(CpfValido)
    usuario_cpf : string;

    @CustomApiProperty({
        description: 'Email do administrador',
        required: true,
    })
    @Generate(() => faker.internet.email())
    @IsNotEmpty()
    @IsEmail()
    usuario_email : string;

    @CustomApiProperty({
        description: 'Nova senha do usuário',
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

    tipo_usuario_id_fk: number;

    usuario_situacao: string;

}