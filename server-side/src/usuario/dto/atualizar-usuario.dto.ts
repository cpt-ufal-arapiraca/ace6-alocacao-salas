import {IsEmail, IsEnum, IsInt, IsOptional, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {NomeValido} from "@validate-custom";
import {TipoUsuarioIndexEnum} from "../../autenticacao/enum/tipo-usuario-autenticacao.enum";

export class AtualizarUsuarioDTO {

    @CustomApiProperty({
        description: 'ID do usuário',
        required: false,
    })
    @Generate(() => faker.number.int({min: 1, max: 100}))
    @IsOptional()
    @IsInt()
    usuario_id : number;

    @CustomApiProperty({
        description: 'Nome do usuário',
        required: false,
    })
    @Generate(() => faker.person.fullName())
    @IsOptional()
    @Validate(NomeValido)
    usuario_nome : string;

    @CustomApiProperty({
        description: 'Email do usuário',
        required: false,
    })
    @Generate(() => faker.internet.email())
    @IsOptional()
    @IsEmail()
    usuario_email : string;

    @CustomApiProperty({
        description: 'ID do Tipo de usuário',
        enum: TipoUsuarioIndexEnum,
        required: false,
    })
    @Generate(() => faker.helpers.arrayElement(Object.values(TipoUsuarioIndexEnum).slice(Math.ceil(Object.values(TipoUsuarioIndexEnum).length / 2))))
    @IsOptional()
    @IsEnum(TipoUsuarioIndexEnum)
    tipo_usuario_id_fk : TipoUsuarioIndexEnum;

    tipo_usuario_logado: string;

}