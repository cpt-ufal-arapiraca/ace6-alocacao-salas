import {HttpException, HttpStatus, Injectable, OnModuleInit} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';


const options = {
    log: [
        {
            emit: 'event' as const,
            level: 'query' as const,
        },
        'info' as const,
        'warn' as const,
        'error' as const,
    ],
} satisfies Prisma.PrismaClientOptions;

@Injectable()
export class PrismaService
    extends PrismaClient<typeof options>
    implements OnModuleInit
{
    constructor() {
        super(options);
        this.$on('query', async (e) => {
            console.log(e.query, e.params);
        });
    }
    async onModuleInit() {
        //await this.$connect();
    }

    tratamentoErros (e: any){

        if (e.meta?.details){
            e.meta.details = e.meta.details.match(/'([^']+)'/)?.[1];
        }else if(e.meta?.message){
            e.meta.message = e.meta.message.match(/'([^']+)'/)?.[1];
        }

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            const erros : {} = {
                'P2000': `O valor fornecido para a coluna é muito longo para o tipo da coluna. Coluna: ${e.meta.column_name}`,
                'P2001': `O registro pesquisado na condição where (${e.meta.modelName}.${e.meta.argument_name} = ${e.meta.argument_value}) não existe`,
                'P2002': `Já existe ${e.meta.modelName} com esse dados, revise o campo ${e.meta.target}`,
                'P2003': `A restrição de chave estrangeira falhou no campo: ${e.meta.field_name}`,
                'P2004': `Uma restrição falhou no banco de dados: ${e.meta.database_error}`,
                'P2005': `O valor ${e.meta.field_value} armazenado no banco de dados para o campo ${e.meta.field_name} é inválido para o tipo do campo`,
                'P2006': `O valor fornecido ${e.meta.field_value} para ${e.meta.model_name} o campo ${e.meta.field_name} não é válido`,
                'P2007': `Erro de validação de dados ${e.meta.database_error}`,
                'P2008': `Falha ao analisar a consulta ${e.meta.query_parsing_error} em ${e.meta.query_position}`,
                'P2009': `Falha ao validar a consulta: ${e.meta.query_validation_error} em ${e.meta.query_position}`,
                'P2010': `Falha na consulta bruta. Código: ${e.meta.code}. Mensagem: ${e.meta.message}`,
                'P2011': `Violação de restrição nula em ${e.meta.target}`,
                'P2012': `Faltando um valor necessário em ${e.meta.path}`,
                'P2013': `Faltando o argumento necessário ${e.meta.argument_name} para o campo ${e.meta.field_name} em ${e.meta.object_name}.`,
                'P2014': `A alteração que você está tentando fazer violaria a relação necessária '${e.meta.relation_name}' entre os modelos ${e.meta.model_a_name} e ${e.meta.model_b_name}.`,
                'P2015': `Não foi possível encontrar um registro relacionado. ${e.meta.details}`,
                'P2016': `Erro de interpretação da consulta. ${e.meta.details}`,
                'P2017': `Os registros de relação ${e.meta.relation_name} entre os modelos ${e.meta.parent_name} e ${e.meta.child_name} não estão conectados.`,
                'P2018': `Os registros conectados necessários não foram encontrados. ${e.meta.details}`,
                'P2019': `Erro de entrada. ${e.meta.details}`,
                'P2020': `Valor fora do intervalo para o tipo, campo ${e.meta.details}`,
                'P2021': `A tabela ${e.meta.table} não existe no banco de dados atual.`,
                'P2022': `A coluna ${e.meta.column} não existe no banco de dados atual.`,
                'P2023': `Dados de coluna inconsistentes: ${e.meta.message}`,
                'P2024': `Tempo limite esgotado ao buscar uma nova conexão no pool de conexões. (Mais informações: http://pris.ly/d/connection-pool (Tempo limite atual do pool de conexões: ${e.meta.timeout}, limite de conexões: ${e.meta.connection_limit})`,
                'P2025': `Uma operação falhou porque depende de um ou mais registros que eram necessários, mas não foram encontrados. ${e.meta.causa}`,
                'P2026': `O provedor de banco de dados atual não oferece suporte a um recurso usado pela consulta: ${e.meta.feature}`,
                'P2027': `Ocorreram vários erros no banco de dados durante a execução da consulta: ${e.meta.errors}`,
                'P2028': `Erro de API de transação: ${e.meta.error}`,
                'P2029': `Erro de limite de parâmetro de consulta excedido: ${e.meta.message}`,
                'P2030': `Não é possível encontrar um índice de texto completo para usar na pesquisa. Tente adicionar @@fulltext([Fields...]) ao seu esquema`,
                'P2031': `O Prisma precisa executar transações, o que requer que seu servidor MongoDB seja executado como um conjunto de réplicas. Veja os detalhes: https://pris.ly/d/mongodb-replica-set`,
                'P2033': `Um número usado na consulta não cabe em um inteiro assinado de 64 bits. Considere usar BigInt como tipo de campo se estiver tentando armazenar inteiros grandes`,
                'P2034': `A transação falhou devido a um conflito de gravação ou um deadlock. Por favor, tente novamente sua transação`,
                'P2035': `Violação de asserção no banco de dados: ${e.meta.database_error}`,
                'P2036': `Erro no conector externo (id ${e.meta.id})`,
                'P2037': `Muitas conexões de banco de dados abertas: ${e.meta.message}`
            }

            if (e.code in erros) {
                console.log(1111111111)
                return new HttpException(
                    erros[e.code],
                    HttpStatus.BAD_REQUEST,
                );
            }
        }else if (e instanceof Prisma.PrismaClientValidationError) {
            return new HttpException(
                `Alguns dos dados enviados estão vazios ou contêm propriedades inválidas.`,
                HttpStatus.BAD_REQUEST,
            );
        }else{
            console.log(e)
            return new HttpException(
                `Erro desconhecido. Tente novamente mais tarde. Caso o erro persista, entre em contato com o suporte.`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

}