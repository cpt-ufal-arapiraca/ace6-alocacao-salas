import { applyDecorators } from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AdministradorCadastrarDTO} from "./dto/administrador-cadastrar.dto";

export function CasdastrarAdministradorDocs() {
    return applyDecorators(
        ApiTags('Administrador'),
        ApiOperation({ summary: 'Realizar cadastro do administrador' }),
        ApiResponse({
            status: 201,
            description: 'Administrador cadastrado com sucesso',
            type: AdministradorCadastrarDTO,
        }),
    );
}