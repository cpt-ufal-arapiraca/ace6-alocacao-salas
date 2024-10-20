export interface DisciplinaInterface {
    total: number;
    quantidade: number;
    disciplinas: {
        codigo_disciplina: string;
        nome: string;
        curso: string;
        periodo: string;
        PPCA: string;
    }[];
}

export interface DisciplinaAtualizarInterface {
    codigo_disciplina: string;
    nome: string;
    curso: string;
    periodo: string;
    PPCA: string;
}

