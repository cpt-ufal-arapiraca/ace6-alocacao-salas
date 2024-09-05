import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';


@ValidatorConstraint({ name: 'nomeValido', async: false })
export class NomeValido implements ValidatorConstraintInterface {
    private errorMessage: string;

    validate(nome: string, validationArguments?: ValidationArguments): boolean {

        if (/\d/.test(nome)) {
            this.errorMessage = 'O nome não deve conter números!';
            return false;
        }

        if (!/^[a-zA-ZÀ-ÿ\s]*$/.test(nome)) {
            this.errorMessage = 'O nome não deve conter caracteres especiais!';
            return false;
        }

        if (nome.includes('  ')) {
            this.errorMessage = 'O nome não deve conter duplo espaços!';
            return false;
        }

        if (nome.trim().length === 0) {
            this.errorMessage = 'O nome não deve conter apenas espaços!';
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments): string {
        return this.errorMessage || 'Nome inválido!';
    }
}