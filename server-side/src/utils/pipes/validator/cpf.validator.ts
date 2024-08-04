import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
interface OpcoesValidacaoCpf{
    complet?: boolean;
}
@ValidatorConstraint({ name: 'cpfValido', async: false })
export class CpfValido implements ValidatorConstraintInterface {
    private errorMessage: string;

    validate(cpf: string, validationArguments?: ValidationArguments): boolean {
        const opcoes: OpcoesValidacaoCpf = validationArguments?.constraints?.[0] || {};

        const {
            complet = false,
        } = opcoes;

        if (/[a-zA-Z]/.test(cpf)) {
            this.errorMessage = 'CPF não deve conter letras.';
            return false;
        }

        cpf = cpf.replace(/\D/g, '');

        if(complet){

            if (cpf.length === 11) {

                if (cpf.length !== 11) {
                    this.errorMessage = `CPF deve conter exatamente 11 dígitos.`;
                    return false;
                }

                const digitoVerificador = (cpfIncompleto: string): string => {
                    let somatorio = 0;

                    for (let i = 0; i < cpfIncompleto.length; i++) {
                        let digitoAtual = cpfIncompleto.charAt(i);
                        let constante = (cpfIncompleto.length + 1 - i);
                        somatorio += Number(digitoAtual) * constante;
                    }
                    const resto = somatorio % 11;
                    return resto < 2 ? '0' : (11 - resto).toString();
                };

                let primeiroDigitoVerificador = digitoVerificador(cpf.substring(0, 9));
                let segundoDigitoVerificador = digitoVerificador(cpf.substring(0, 9) + primeiroDigitoVerificador);

                let cpfCorreto = cpf.substring(0, 9) + primeiroDigitoVerificador + segundoDigitoVerificador;

                if (cpf !== cpfCorreto) {
                    this.errorMessage = 'CPF inválido.';
                    return false;
                }

            }

        }else {

            cpf = cpf.replace(/\D/g, '');

            if (cpf.length !== 11) {
                this.errorMessage = `CPF deve conter exatamente 11 dígitos.`;
                return false;
            }

            const digitoVerificador = (cpfIncompleto: string): string => {
                let somatorio = 0;

                for (let i = 0; i < cpfIncompleto.length; i++) {
                    let digitoAtual = cpfIncompleto.charAt(i);
                    let constante = (cpfIncompleto.length + 1 - i);
                    somatorio += Number(digitoAtual) * constante;
                }
                const resto = somatorio % 11;
                return resto < 2 ? '0' : (11 - resto).toString();
            };

            let primeiroDigitoVerificador = digitoVerificador(cpf.substring(0, 9));
            let segundoDigitoVerificador = digitoVerificador(cpf.substring(0, 9) + primeiroDigitoVerificador);

            let cpfCorreto = cpf.substring(0, 9) + primeiroDigitoVerificador + segundoDigitoVerificador;

            if (cpf !== cpfCorreto) {
                this.errorMessage = 'CPF inválido.';
                return false;
            }

        }

        return true;
    }

    defaultMessage(args: ValidationArguments): string {
        return this.errorMessage || 'CPF não é válido.';
    }
}