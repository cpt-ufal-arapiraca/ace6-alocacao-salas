import {IsJWT, IsNotEmpty} from 'class-validator';

export class SairAutenticacaoDTO {

    @IsNotEmpty()
    @IsJWT()
    sessao_jwt: string;
    
}