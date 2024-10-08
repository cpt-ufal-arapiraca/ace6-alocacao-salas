import {IsEnum, IsIn, IsInt, IsOptional, Validate} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {CpfValido, NomeValido} from "@validate-custom";
import {Type} from "class-transformer";
import {TipoUsuarioIndexEnum} from "../../autenticacao/enum/tipo-usuario-autenticacao.enum";

export class ListarUsuarioDTO {

    @CustomApiProperty({
        description: 'Nome do usuário',
        required: false,
    })
    @Generate(() => faker.person.fullName())
    @IsOptional()
    @Validate(NomeValido)
    usuario_nome?: string;

    @CustomApiProperty({
        description: 'CPF do usuário',
        required: false,
    })
    @Generate(() => faker.custom.cpf())
    @IsOptional()
    @Validate(CpfValido, [{ complet: true }])
    usuario_cpf ?: string;

    @CustomApiProperty({
        description: 'Tipo do usuário (Administrador, Gerente, Coordenador, Professor)',
        enum: TipoUsuarioIndexEnum,
        required: false,
    })
    @Generate(() => faker.helpers.arrayElement([...Object.values(TipoUsuarioIndexEnum)]))
    @Type(() => Number)
    @IsOptional()
    @IsEnum(TipoUsuarioIndexEnum)
    @IsInt()
    tipo_usuario_id_fk ?: TipoUsuarioIndexEnum;

    @CustomApiProperty({
        description: 'Valor para paginação',
        required: false,
    })
    @Generate(() => faker.number.int({min:1, max: 10}))
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    pagina?: number

    @CustomApiProperty({
        description: 'ordenação dos usuários',
        enum: ['asc', 'desc'],
        required: false,
    })
    @Generate(() => faker.helpers.arrayElement(['asc', 'desc']))
    @IsOptional()
    @IsIn(['asc', 'desc'])
    ordenacao?: 'asc' | 'desc';

}