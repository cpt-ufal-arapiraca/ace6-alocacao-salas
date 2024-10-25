CREATE TABLE `autenticacao` (
  `autenticacao_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id_fk` int(11) NOT NULL,
  `autenticacao_senha` varchar(255) NOT NULL,
  `autenticacao_token` varchar(255),
  `autenticacao_situacao` varchar(10) NOT NULL,
  PRIMARY KEY (`autenticacao_id`),
  UNIQUE KEY `usuario_id_fk` (`usuario_id_fk`),
  CONSTRAINT `autenticacao_ibfk_1` FOREIGN KEY (`usuario_id_fk`) REFERENCES `usuario` (`usuario_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `disciplina` (
  `disciplina_id` int(11) NOT NULL AUTO_INCREMENT,
  `disciplina_codigo` varchar(50) NOT NULL,
  `disciplina_nome` varchar(100) NOT NULL,
  `disciplina_curso` varchar(100) NOT NULL,
  `disciplina_periodo` int(11) NOT NULL,
  `disciplina_PPCA` varchar(50),
  PRIMARY KEY (`disciplina_id`),
  UNIQUE KEY `disciplina_codigo` (`disciplina_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sala` (
  `sala_id` int(11) NOT NULL AUTO_INCREMENT,
  `sala_codigo` varchar(50) NOT NULL,
  `sala_tipo` varchar(20) NOT NULL,
  `sala_bloco` varchar(10) NOT NULL,
  `sala_capacidade` int(11) NOT NULL,
  PRIMARY KEY (`sala_id`),
  UNIQUE KEY `sala_codigo` (`sala_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sessao` (
  `sessao_id` int(11) NOT NULL AUTO_INCREMENT,
  `autenticacao_id_fk` int(11) NOT NULL,
  `sessao_ip` varchar(15) NOT NULL,
  `sessao_so` varchar(25) NOT NULL,
  `sessao_jwt` varchar(256) NOT NULL,
  `data_hora_login` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`sessao_id`),
  UNIQUE KEY `idx_jwt_UNIQUE` (`sessao_jwt`),
  KEY `autenticacao_id_fk` (`autenticacao_id_fk`),
  CONSTRAINT `sessao_ibfk_1` FOREIGN KEY (`autenticacao_id_fk`) REFERENCES `autenticacao` (`autenticacao_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `tipo_usuario` (
  `tipo_usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_usuario_nome` varchar(15) NOT NULL,
  PRIMARY KEY (`tipo_usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tipo_usuario` (`tipo_usuario_id`, `tipo_usuario_nome`) VALUES
(1, 'Administrador'), (2, 'Gerente'), (3, 'Coordenador'), (4, 'Professor');

CREATE TABLE `turma` (
  `turma_id` int(11) NOT NULL AUTO_INCREMENT,
  `turma_codigo` varchar(50) NOT NULL,
  `turma_professor` varchar(100) NOT NULL,
  `turma_capacidade` int(11) NOT NULL,
  `turma_turno` varchar(20) NOT NULL,
  `turma_horario` date NOT NULL,
  `turma_tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`turma_id`),
  UNIQUE KEY `turma_codigo` (`turma_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `usuario` (
  `usuario_id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_uuid` varchar(36),
  `usuario_nome` varchar(255),
  `usuario_cpf` varchar(11) NOT NULL,
  `usuario_email` varchar(255),
  `usuario_siape` int(11),
  `tipo_usuario_id_fk` int(11) NOT NULL,
  `usuario_situacao` varchar(10) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `idx_cpf_UNIQUE` (`usuario_cpf`),
  UNIQUE KEY `usuario_uuid` (`usuario_uuid`),
  UNIQUE KEY `idx_email_UNIQUE` (`usuario_email`),
  UNIQUE KEY `idx_siape_UNIQUE` (`usuario_siape`),
  KEY `tipo_usuario_id_fk` (`tipo_usuario_id_fk`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`tipo_usuario_id_fk`) REFERENCES `tipo_usuario` (`tipo_usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;