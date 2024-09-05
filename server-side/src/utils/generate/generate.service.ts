import { Injectable } from '@nestjs/common';
import 'reflect-metadata';
import {GENERATE_METADATA_KEY} from "@decorators-custom";
import {EntrarAutenticacaoDTO} from "../../autenticacao/dto/entrar-autenticacao.dto";
import {TipoUsuarioIndexEnum} from "../../autenticacao/enum/tipo-usuario-autenticacao.enum";

type DynamicDTO<T> = {
    [K in keyof T]: T[K];
};

@Injectable()
export class GenerateService {
    Generate<T>(DTO: { new(): T }): DynamicDTO<T> {
        function getProperties(target: any) {
            return Reflect.getMetadata(GENERATE_METADATA_KEY, target) || [];
        }

        const dtoInstance = new DTO();
        const properties = getProperties(DTO);

        properties.forEach(({ propertyKey, generator }: any) => {
            if (generator && typeof generator === 'function') {
                dtoInstance[propertyKey] = generator();
            }
        });

        return dtoInstance as DynamicDTO<T>;
    }

    async onModuleInit() {
        const result = this.Generate(EntrarAutenticacaoDTO);
        //result.enf_id = 1;
        //console.log(result.enf_id)
        console.log(Object.values(TipoUsuarioIndexEnum));
        console.log(result);
    }
}
