export interface GerarSenhaOptions {
    minTamanho?: number;
    contemMaiuscula?: boolean;
    contemMinuscula?: boolean;
    contemNumero?: boolean;
    contemCaractereEspecial?: boolean;
}

export function gerarSenhaForte({minTamanho = 8, contemMaiuscula = true, contemMinuscula = true, contemNumero = true, contemCaractereEspecial = true }: GerarSenhaOptions): string {

    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const caracteresEspeciais = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let caracteresDisponiveis = '';
    if (contemMaiuscula) caracteresDisponiveis += maiusculas;
    if (contemMinuscula) caracteresDisponiveis += minusculas;
    if (contemNumero) caracteresDisponiveis += numeros;
    if (contemCaractereEspecial) caracteresDisponiveis += caracteresEspeciais;

    if (caracteresDisponiveis.length === 0) {
        throw new Error('Pelo menos um tipo de caractere deve ser incluído.');
    }

    let senha = '';

    if (contemMaiuscula) senha += maiusculas.charAt(Math.floor(Math.random() * maiusculas.length));
    if (contemMinuscula) senha += minusculas.charAt(Math.floor(Math.random() * minusculas.length));
    if (contemNumero) senha += numeros.charAt(Math.floor(Math.random() * numeros.length));
    if (contemCaractereEspecial) senha += caracteresEspeciais.charAt(Math.floor(Math.random() * caracteresEspeciais.length));

    for (let i = senha.length; i < minTamanho; i++) {
        senha += caracteresDisponiveis.charAt(Math.floor(Math.random() * caracteresDisponiveis.length));
    }

    return senha.split('').sort(() => Math.random() - 0.5).join('');
}