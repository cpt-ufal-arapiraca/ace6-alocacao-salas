// faker-custom.ts
import { fakerPT_BR as faker } from '@faker-js/faker';
import { generateValidCPF } from './faker-cpf';
import { gerarSenhaForte} from './faker-senha';

declare module '@faker-js/faker' {
    interface Faker {
        custom: {
            cpf: () => string,
            senha: (GerarSenhaOptions) => string,
        };
    }
}

faker.custom = {
    cpf: generateValidCPF,
    senha: (GerarSenhaOptions) => gerarSenhaForte( GerarSenhaOptions || {}),
};

export default faker;
