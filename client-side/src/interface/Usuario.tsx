export interface UsuarioInterface {
    total: number;
    quantidade: number;
    usuarios: {
        usuario_id: number;
        usuario_nome: string;
        usuario_cpf: string;
        usuario_email: string;
        tipo_usuario: {
            tipo_usuario_nome: string;
        };
    }[];
}

export interface UsuarioAtualizarInterface {
    usuario_siape: number;
    usuario_id: number;
    usuario_nome: string;
    usuario_cpf: string;
    usuario_email: string;
    tipo_usuario: {
        tipo_usuario_id: number;
        tipo_usuario_nome: string;
    };
}

