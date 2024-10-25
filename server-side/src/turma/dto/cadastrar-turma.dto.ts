import {IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsNumberString} from 'class-validator';
import {CustomApiProperty, Generate} from "@decorators-custom";
import faker from "@faker-custom";
import {Type} from "class-transformer";
import { TurnoTurmaEnum } from '../enum/turno-turma.enum';
import { TipoTurmaEnum } from '../enum/tipo-turma.enum';

export class CadastrarTurmaDTO {

    @CustomApiProperty({
        description: 'Código da Turma',
        required: true,
    })
    @Generate(() => faker.number.int())
    @IsNumberString()
    @IsNotEmpty()
    turma_codigo : string;

    @CustomApiProperty({
        description: 'Professor da turma',
        required: true,
    })
    @Generate(() => faker.person.firstName())
    turma_professor: string;

    @CustomApiProperty({
        description: 'Turno da turma',
        required: true,
    })
    @Generate(() => faker.helpers.arrayElement(Object.values(TurnoTurmaEnum).slice(Math.ceil(Object.values(TurnoTurmaEnum).length / 2))))
    @IsEnum(TurnoTurmaEnum)
    @IsNotEmpty()
    turma_turno : TurnoTurmaEnum;

    @CustomApiProperty({
        description: 'Capacidade da turma',
        required: true,
    })
    @Generate(() => faker.number.int())
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    turma_capacidade : number;

    @CustomApiProperty({
        description: 'Horário da turma',
        required: true,
    })
    @Generate(() => faker.date.anytime())
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    turma_horario : Date;

    @CustomApiProperty({
        description: 'Tipo da turma',
        required: true,
    })
    @Generate(() => faker.helpers.arrayElement(Object.values(TipoTurmaEnum).slice(Math.ceil(Object.values(TipoTurmaEnum).length / 2))))
    @IsEnum(TipoTurmaEnum)
    @IsNotEmpty()
    turma_tipo : TipoTurmaEnum;
    
}