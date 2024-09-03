import faker from '@faker-custom';
import { applyDecorators } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CustomApiProperty, Generate } from 'src/utils/generate/decorators';



export function CadastrarSalaDocs() {
    return applyDecorators(
        ApiTags('Sala'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Cadastrar Sala' }),
        ApiResponse({
            status: 201,
            description: 'Sala cadastrada com sucesso',
        }),
    );
    
    
}

export function RemoverSalaDocs() {
    return applyDecorators(
        ApiTags('Sala'),
        ApiBearerAuth(),
        ApiOperation({ summary: 'Remover Sala' }),
        ApiResponse({
            status: 200,
            description: 'Sala removida com sucesso',
        }),
    );
}

export function AlterarSalaDocs() {
        return applyDecorators(
            ApiTags('Sala'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Atualizar sala' }),
            ApiResponse({
                status: 200,
                description: 'Sala alterada com sucesso',
            }),
        );
    }    
    
    // class ObterSala200DTO {

    //     @CustomApiProperty({
    //         description: 'ID da sala',
    //     })
    //     @Generate(() => faker.number.int({min: 1, max: 100}))
    //     sala_id: string;
    
    //     @CustomApiProperty({
    //         description: 'Código da sala',
    //     })
    //     @Generate(() => faker.person.fullName())
    //     codigo_sala: string;

    //     @CustomApiProperty({
    //         description: 'Tipo da sala',
    //     })
    //     @Generate(() => faker.string.alpha())
    //     tipo: string;
    
        
    //     @Generate(() => faker.string.fromCharacters(['a', 'b', 'c']))
    //     @IsString()
    //     bloco : string;
    
    //     @Generate(() => faker.number.int())
    //     capacidade: number;
    
    //     @CustomApiProperty({
    //         description: 'Tipo do usuário',
    //     })
    //     // tipo_sala: TipoUsuario2Autenticacao200DTO;
    // }

    export function ObterSalaDocs() {
        return applyDecorators(
            ApiTags('Sala'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Obter Sala' }),
            ApiResponse({
                status: 200,
                description: 'Sala obtido com sucesso',
                // type: ObterSala200DTO,
            }),
        );
    }

export function ListarSalaDocs() {
        return applyDecorators(
            ApiTags('Sala'),
            ApiBearerAuth(),
            ApiOperation({ summary: 'Listar salas' }),
            ApiResponse({
                status: 200,
                description: 'Salas listadas com sucesso',
                
            }),
        );
    }
