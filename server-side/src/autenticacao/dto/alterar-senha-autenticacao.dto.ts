import {IsNotEmpty, IsStrongPassword} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";

export class AlterarSenhaAutenticacaoDTO {

    @CustomApiProperty({
        description: 'Senha antiga do usuário',
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
    autenticacao_senha_antiga : string;

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

    usuario_id_fk: number;

}