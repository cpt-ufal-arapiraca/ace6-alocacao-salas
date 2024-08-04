function calculateDigit(numbers: number[]): number {
    const sum = numbers.reduce((total, num, index) => {
        return total + num * (numbers.length + 1 - index);
    }, 0);

    const result = 11 - (sum % 11);
    return result > 9 ? 0 : result;
}


export function generateValidCPF(): string {
    const cpfArray: number[] = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
    cpfArray.push(calculateDigit(cpfArray));
    cpfArray.push(calculateDigit(cpfArray));

    return cpfArray.join('');
}