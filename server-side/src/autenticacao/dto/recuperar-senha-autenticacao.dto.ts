import {IsNotEmpty, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {CpfValido} from "@validate-custom";

export class RecuperarSenhaAutenticacaoDTO {

    @CustomApiProperty({
        description: 'CPF do usuário',
        required: true,
    })
    @Generate(() => faker.custom.cpf())
    @IsNotEmpty()
    @Validate(CpfValido)
    usuario_cpf: string;
    
}