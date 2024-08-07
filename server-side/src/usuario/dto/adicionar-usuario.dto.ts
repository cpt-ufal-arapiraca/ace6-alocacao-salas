import {IsEnum, IsNotEmpty, IsStrongPassword, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {CpfValido} from "@validate-custom";
import {TipoUsuarioEnum, TipoUsuarioIndexEnum} from "../../autenticacao/enum/tipo-usuario-autenticacao.enum";

export class AdicionarUsuarioDTO {

    @CustomApiProperty({
        description: 'CPF do usuário',
        required: true,
    })
    @Generate(() => faker.custom.cpf())
    @IsNotEmpty()
    @Validate(CpfValido)
    usuario_cpf : string;

    @CustomApiProperty({
        description: 'Tipo do usuário',
        enum: TipoUsuarioEnum,
        required: true,
    })
    @Generate(() => faker.helpers.arrayElement([...Object.values(TipoUsuarioIndexEnum)]))
    @IsEnum(TipoUsuarioIndexEnum)
    tipo_usuario_id : TipoUsuarioIndexEnum;

    usuario_situacao: string;

}