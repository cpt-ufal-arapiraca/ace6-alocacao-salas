import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as DTO from "@swagger-custom";

@Controller()
@ApiTags('Erros')
export class AppController {
    @Post('')
    @ApiOperation({ summary: 'tipos de retornos de erros disponíveis e padronizados para todos os endpoints.'})
    @ApiResponse({
        status: 400,
        description: 'Solicitação malsucedida',
        type: DTO.Swagger400DTO,
    })
    @ApiResponse({
        status: 401,
        description: 'Requisição sem autenticação',
        type: DTO.Swagger401DTO,
    })
    @ApiResponse({
        status: 403,
        description: 'Requisição recusada',
        type: DTO.Swagger403DTO,
    })
    @ApiResponse({
        status: 422,
        description: 'Conteúdo não processável',
        type: DTO.Swagger422DTO,
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno no servidor',
        type: DTO.Swagger500DTO,
    })
    login(): any {}
}
