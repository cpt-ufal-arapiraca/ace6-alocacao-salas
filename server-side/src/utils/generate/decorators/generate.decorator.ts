import 'reflect-metadata';
import {GENERATE_METADATA_KEY} from './index'

export function Generate(generator: () => any) {
    return function (target: any, propertyKey: string) {
        const properties = Reflect.getMetadata(GENERATE_METADATA_KEY, target.constructor) || [];
        //properties.push(propertyKey);
        properties.push({ propertyKey, generator });
        Reflect.defineMetadata(GENERATE_METADATA_KEY, properties, target.constructor);
    }
}