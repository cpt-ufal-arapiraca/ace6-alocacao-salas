import faker from '@faker-custom';
import {CustomApiProperty, Generate} from "@decorators-custom";
import {IsJWT, IsNotEmpty, IsStrongPassword} from "class-validator";

export class RedefinirSenhaAutenticacaoDTO {

    @CustomApiProperty({
        description: 'Nova senha do usuário',
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

    @CustomApiProperty({
        description: 'Token jwt de autorização do procedimento',
        required: true,
    })
    @Generate(() => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
    @IsNotEmpty()
    @IsJWT()
    autenticacao_token: string;


}