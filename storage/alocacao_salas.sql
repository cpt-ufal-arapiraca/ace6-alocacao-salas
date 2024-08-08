CREATE DATABASE alocacao_salas;

USE alocacao_salas;

CREATE TABLE tipo_usuario (
    tipo_usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_usuario_nome VARCHAR(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO tipo_usuario (tipo_usuario_nome) VALUES
('Administrador'),
('Gerente'),
('Coordenador'),
('Professor');

CREATE TABLE usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_iuud VARCHAR(36) NOT NULL UNIQUE,
    usuario_nome VARCHAR(255),
    usuario_cpf VARCHAR(11) NOT NULL UNIQUE,
    usuario_email VARCHAR(255) UNIQUE,
    usuario_siape INT UNIQUE,
    tipo_usuario_id_fk INT NOT NULL,
    usuario_situacao VARCHAR(10) NOT NULL,
    FOREIGN KEY (tipo_usuario_id_fk) REFERENCES tipo_usuario(tipo_usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE autenticacao (
    autenticacao_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id_fk INT NOT NULL UNIQUE,
    autenticacao_senha VARCHAR(255) NOT NULL,
    autenticacao_token VARCHAR(255),
    autenticacao_situacao VARCHAR(10) NOT NULL,
    FOREIGN KEY (usuario_id_fk) REFERENCES usuario(usuario_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE sessao (
    sessao_id INT AUTO_INCREMENT PRIMARY KEY,
    autenticacao_id_fk INT NOT NULL,
    sessao_ip VARCHAR(15) NOT NULL,
    sessao_so VARCHAR(25) NOT NULL,
    sessao_jwt VARCHAR(256) NOT NULL UNIQUE,
    data_hora_login DATETIME(0) DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autenticacao_id_fk) REFERENCES autenticacao(autenticacao_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE UNIQUE INDEX idx_cpf_UNIQUE ON usuario (usuario_cpf);
CREATE UNIQUE INDEX idx_siape_UNIQUE ON usuario (usuario_siape);
CREATE UNIQUE INDEX idx_email_UNIQUE ON usuario (usuario_email);
CREATE UNIQUE INDEX idx_jwt_UNIQUE ON sessao (sessao_jwt);
