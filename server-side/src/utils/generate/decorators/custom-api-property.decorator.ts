import 'reflect-metadata';
import {ApiProperty, ApiPropertyOptions} from "@nestjs/swagger";
import {GENERATE_METADATA_KEY} from './index'

export function CustomApiProperty(options: ApiPropertyOptions = {}): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {

        const properties = Reflect.getMetadata(GENERATE_METADATA_KEY, target.constructor) || [];
        const generator = properties.find((meta: any) => meta.propertyKey === propertyKey)?.generator;
        const exampleValue = generator ? generator() : options.example;

        const finalOptions = {
            ...options,
            example: exampleValue,
        };

        ApiProperty(finalOptions)(target, propertyKey);
    };
}