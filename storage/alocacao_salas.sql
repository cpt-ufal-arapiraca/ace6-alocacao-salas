CREATE DATABASE alocacao_salas;

USE alocacao_salas;

CREATE TABLE tipo_usuario (
  tipo_usuario_id int(11) NOT NULL AUTO_INCREMENT,
  nome varchar(15) NOT NULL,
  PRIMARY KEY (tipo_usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE usuario (
  usuario_id int(11) NOT NULL AUTO_INCREMENT,
  usuario_nome varchar(255) NOT NULL,
  usuario_cpf int(11) NOT NULL,
  usuario_email varchar(255) NOT NULL,
  tipo_usuario_id int(11) NOT NULL,
  usuario_situacao varchar(10) NOT NULL,
  PRIMARY KEY (usuario_id),
  KEY FK_usuario_tipo (tipo_usuario_id),
  CONSTRAINT FK_usuario_tipo FOREIGN KEY (tipo_usuario_id) REFERENCES tipo_usuario (tipo_usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE login (
  login_id int(11) NOT NULL AUTO_INCREMENT,
  usuario_id_fk int(11) NOT NULL,
  login_senha int(11) NOT NULL,
  login_token varchar(255) DEFAULT NULL,
  login_situacao varchar(10) NOT NULL,
  PRIMARY KEY (login_id),
  KEY FK_login_usuario (usuario_id_fk),
  CONSTRAINT login_usuario_fk FOREIGN KEY (usuario_id_fk) REFERENCES usuario (usuario_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE secao (
  secao_id int(11) NOT NULL AUTO_INCREMENT,
  usuario_id int(11) NOT NULL,
  ip int(12) NOT NULL,
  so varchar(25) NOT NULL,
  jwt varchar(255) NOT NULL,
  data_hora_login datetime NOT NULL DEFAULT current_timestamp()
  PRIMARY KEY (secao_id),
  KEY FK_secao_usuario (usuario_id),
  CONSTRAINT FK_secao_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;