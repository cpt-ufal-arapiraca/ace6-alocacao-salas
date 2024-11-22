# Alocação de Salas

O sistema tem o objetivo de analisar/encontrar a melhor ordenação de salas com base em cada nova turma do ano letivo.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implantação)** para saber como implantar o projeto.

### 📋 Pré-requisitos

Para a execução do sistema em máquina local, é necessário instalar alguns programas/dependências, elas são:

**Banco de Dados**

- MariaDB

**Back-End**

- Node.js - 20
- NestJS
- Prisma
- Swagger

**Front-End**

- React
- Node.js - 20

### 🔧 Instalação

#### Estrutura do Projeto

O projeto está organizado com a seguinte estrutura de diretórios:

- `client-side`: Código do Front-End desenvolvido em React.
- `server-side`: Código do Back-End desenvolvido com Node.js, NestJS, Prisma e Swagger.
- `storage`: Contém o arquivo SQL do banco de dados.
- `resources`: Recursos adicionais do projeto.
- `INSTRUCOES.md`: Instruções adicionais.
- `README.md`: Este arquivo.
- `package.json` e `package-lock.json`: Arquivos de configuração do npm na raiz do projeto.

#### Clonando o Repositório

Faça o clone do repositório:

```bash
git clone https://github.com/cpt-ufal-arapiraca/ace6-alocacao-salas.git
```

#### Instalação das Dependências na Raiz do Projeto

Na raiz do projeto, execute:

```bash
cd ace6-alocacao-salas
npm install
```

Isso instalará quaisquer dependências comuns definidas no `package.json` da raiz.

#### Instalação e Configuração do Back-End

Este guia fornece instruções detalhadas para a instalação e configuração do Back-End usando Node.js, NestJS, Prisma e Swagger.

##### Instalação do Node.js

1. **Download do Node.js:**

   - Acesse [o site oficial do Node.js](https://nodejs.org/en) e faça o download da versão 20 LTS ou superior.

2. **Instale o Node.js:**

   - Após a instalação, verifique com o seguinte comando no terminal:

     ```bash
     node -v
     ```

##### Instalação do NestJS CLI

1. **Instalação do NestJS CLI:**

   - Execute o seguinte comando no terminal para instalar o NestJS CLI globalmente:

     ```bash
     npm install -g @nestjs/cli
     ```

2. **Verifique a instalação:**

   ```bash
   nest --version
   ```

##### Configurando o Back-End

1. **Acesse o diretório do Back-End:**

   ```bash
   cd server-side
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configuração do Banco de Dados:**

   - Certifique-se de que o MariaDB está instalado e em execução.
   - Crie um banco de dados no MariaDB para o projeto.
   - crie um arquivo  `.env` na raiz no `server-side` e atualize com as informações de conexão do banco de dados.

     Exemplo do arquivo `.env`:

     ```
     DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
     ```

4. **Aplicando as Migrações do Prisma:**

   ```bash
   npx prisma migrate dev
   ```

5. **Carregando Dados Iniciais:**

   - O arquivo de dados do banco está localizado na pasta `storage`.
   - Retorne à raiz do projeto:

     ```bash
     cd ..
     ```

   - Importe o arquivo SQL para o seu banco de dados MariaDB. Você pode usar o seguinte comando:

     ```bash
     mysql -u usuario -p nome_do_banco < storage/dump.sql
     ```

     Substitua `usuario`, `nome_do_banco` e `dump.sql` pelos valores correspondentes.

6. **Executando a Aplicação em Modo de Desenvolvimento:**

   - Volte para o diretório do Back-End:

     ```bash
     cd server-side
     ```

   - Inicie o servidor:

     ```bash
     npm run start:dev
     ```

   A aplicação estará disponível em `http://localhost:5555` (ou a porta especificada).

7. **Acessando a Documentação Swagger:**

   - A documentação da API gerada pelo Swagger está disponível em:

     ```
     http://localhost:3001/docs
     ```

#### Instalação e Configuração do Front-End

Este guia fornece instruções detalhadas para a instalação e configuração do Front-End usando React e Node.js.

##### Instalação do Node.js

Já instalado anteriormente para o Back-End.

##### Configurando o Front-End

1. **Acesse o diretório do Front-End:**

   - Da raiz do projeto, navegue até `client-side`:

     ```bash
     cd ../client-side
     ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configuração das Variáveis de Ambiente:**

   - Renomeie o arquivo `.env.example` para `.env` e configure a URL do Back-End se necessário.

     Exemplo do arquivo `.env`:

     ```
     REACT_APP_API_URL=http://localhost:3001
     ```

4. **Executando o Aplicativo em Modo de Desenvolvimento:**

   ```bash
   npm start
   ```

   O aplicativo será executado em `http://localhost:3000`.

5. **Build para Produção:**

   Para criar uma versão otimizada para produção:

   ```bash
   npm run build
   ```

   Os arquivos de build serão gerados na pasta `build`.

#### Notas Adicionais

- **Conflito de Portas:** Certifique-se de que o Back-End e o Front-End estão executando em portas diferentes. Por padrão, o React usa a porta `3000`, enquanto o NestJS pode ser configurado para usar a porta `3001`.

- **Recursos:** A pasta `resources` contém recursos adicionais que podem ser úteis para o desenvolvimento ou implantação do projeto.

- **Instruções Adicionais:** Consulte o arquivo `INSTRUCOES.md` para instruções adicionais que possam ser relevantes.

### Resumo dos Comandos

- **Clonar o repositório:**

  ```bash
  git clone https://github.com/cpt-ufal-arapiraca/ace6-alocacao-salas.git
  ```

- **Instalar dependências na raiz do projeto:**

  ```bash
  cd ace6-alocacao-salas
  npm install
  ```

- **Configurar e executar o Back-End:**

  ```bash
  cd server-side
  npm install
  # Configurar o .env e o banco de dados conforme instruções acima
  npx prisma migrate dev
  npm run start:dev
  ```

- **Importar dados do banco de dados:**

  ```bash
  cd ..
  mysql -u usuario -p nome_do_banco < storage/dump.sql
  ```

- **Configurar e executar o Front-End:**

  ```bash
  cd client-side
  npm install
  # Configurar o .env conforme instruções acima
  npm start
  ```

## 📦 Implantação

(As instruções de implantação serão adicionadas aqui.)

## 🛠️ Construído com

Ferramentas e tecnologias utilizadas no desenvolvimento deste projeto:

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript
- [NestJS](https://nestjs.com/) - Framework para Node.js
- [Prisma](https://www.prisma.io/) - ORM
- [Swagger](https://swagger.io/) - Documentação de APIs
- [React](https://reactjs.org/) - Biblioteca JavaScript para interfaces de usuário
- [MariaDB](https://mariadb.org/) - Banco de dados relacional

## 📌 Versão

Nós usamos [GitFlow](https://git-scm.com/) para controle de versão. Para as versões disponíveis, observe as [tags neste repositório](https://github.com/cpt-ufal-arapiraca/ace6-alocacao-salas/releases).

## ✒️ Autores

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início:

- **Douglas** - _Back-end com Node.js e NestJS_ - [Douglas Alves](https://github.com/Douglas-Alv3s)
- **Roberto** - _Banco de dados_ - [Roberto Gramacho](https://github.com/jrobertogram)
- **Luckas** - _Front-end_ - [Luckas Ferreira](https://github.com/Luckas-Ferreira)
- **Wellington** - _Documentação e UI/UX_ -

Você também pode ver a lista de todos os [colaboradores](https://github.com/cpt-ufal-arapiraca/ace6-alocacao-salas/colaboradores) que participaram deste projeto.
