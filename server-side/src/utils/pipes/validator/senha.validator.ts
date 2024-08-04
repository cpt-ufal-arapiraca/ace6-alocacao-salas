import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
interface OpcoesValidacaoSenha {
    minTamanho?: number;
    contemMaiuscula?: boolean;
    contemMinuscula?: boolean;
    contemNumero?: boolean;
    contemCaractereEspecial?: boolean;
}
@ValidatorConstraint({ name: 'senhaValida', async: false })
export class SenhaValida implements ValidatorConstraintInterface {
    private errorMessage: string;

    validate(senha: string, validationArguments?: ValidationArguments): boolean {
        const opcoes: OpcoesValidacaoSenha = validationArguments?.constraints?.[0] || {};

        const {
            minTamanho = 8,
            contemMaiuscula = true,
            contemMinuscula = true,
            contemNumero = true,
            contemCaractereEspecial = true
        } = opcoes;


        if (minTamanho && senha.length < minTamanho) {
            this.errorMessage = `A senha deve ter no mínimo ${minTamanho} dígitos!`;
            return false;
        }

        if (contemMaiuscula && !/[A-Z]/.test(senha)) {
            this.errorMessage = 'A senha deve conter pelo menos uma letra maiúscula!';
            return false;
        }

        if (contemMinuscula && !/[a-z]/.test(senha)) {
            this.errorMessage = 'A senha deve conter pelo menos uma letra minúscula!';
            return false;
        }

        if (contemNumero && !/\d/.test(senha)) {
            this.errorMessage = 'A senha deve conter pelo menos um número!';
            return false;
        }

        if (contemCaractereEspecial && !/[^a-zA-Z0-9]/.test(senha)) {
            this.errorMessage = 'A senha deve conter pelo menos um caractere especial!';
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments): string {
        return this.errorMessage || 'Senha inválida!';
    }
}
