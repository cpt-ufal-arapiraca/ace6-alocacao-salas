import {IsEnum, IsNotEmpty, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {CpfValido} from "@validate-custom";
import {TipoUsuarioEnum, TipoUsuarioIndexEnum} from "../../autenticacao/enum/tipo-usuario-autenticacao.enum";
import {Type} from "class-transformer";

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
        description: 'ID do Tipo de usuário',
        enum: TipoUsuarioIndexEnum,
        required: true,
    })
    @Generate(() => faker.helpers.arrayElement(Object.values(TipoUsuarioIndexEnum).slice(Math.ceil(Object.values(TipoUsuarioIndexEnum).length / 2))))
    @Type(() => Number)
    @IsEnum(TipoUsuarioIndexEnum)
    tipo_usuario_id_fk : TipoUsuarioIndexEnum;

    usuario_situacao: string;

}