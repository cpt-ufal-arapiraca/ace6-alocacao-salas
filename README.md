# Alocação de Salas

O sistema tem o objetivo de analisar/encontrar a melhor ordenação de salas com base em cadas nova turmas do ano letivo.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

Para a execursão do sistema em maquina local, é necessário instalar alguns programas/depeondecias, elas sãos:

Banco de Dados
```
MariaDb
```

Back-End
```
Java - 17
Spring Boot - 3.2.3
```

Front-End
```
Angular - 17
Nodejs - 20
```

### 🔧 Instalação

#### Instalação e Configuração do Front-end com tecnologias usadas.

Este guia fornece instruções detalhadas para a instalação e configuração do Front-end usando (Angular, Node.js, Tailwind CSS). O Node.js é uma solução fácil e rápida para instalar todas as dependências necessárias para rodar o ambiente de desenvolvimento.

#### Instalação do Node.js

1. **Download do Node.js:**
   - Acesse [o site oficial do Node.js](https://nodejs.org/en) e faça o download da versão 20 LTS ou superior.

2. **Instale o Node.js:**
   - Após a instalação, verifique com o seguinte comando no terminal:
   ```bash
     node -v
     ```

#### Instalação do Angular

1. **Instalação:**
   - Acesse [o site oficial do Angular na tela de instalação](https://angular.io/guide/setup-local), ou execute o seguinte comando no terminal.
    ```bash
     npm install -g @angular/cli@17
     ```
   - Perceba que usamos a tag '-g', isso indica que estamos instalando o Angular globalmente, em toda a máquina.
   - Perceba que instalamos a versão 17, pois o projeto foi desenvolvido nesta versão.


3. **Instalando dependências.**
   - Após clonar este repositório, entre na pasta com o seguinte comando:
   ```bash
     cd ace6-alocacao-salas/
   ```
   - Agora, execute o seguinte comando:
   ```bash
     npm install
   ```
   - Com isso, todas as dependências serão baixadas.


5. **Execução, modo desenvolvimento:**
   - Para executar em modo de desenvolvimento, execute o seguinte comando:
   ```bash
     ng server
   ```


6. **Build, modo produção:**
   - Para fazer o Build em modo produção, execute o seguinte comando:
   ```bash
     ng build --aot --configuration=production
   ```
#

#### Instalação e Configuração do Back-end com tecnologias usadas.

Este guia fornece instruções detalhadas para a instalação e configuração do Back-end usando (Java, Spring Boot).O Java Spring Framework (Spring Framework) é um framework bastante conhecido de nível empresarial, de software livre, para criar aplicativos independentes de nível de produção que são executados na Java Virtual Machine (JVM).

#### Instalação do Java 17

1. **Download do Java 17**
   - Acesse [o site oficial do Node.js](https://www.oracle.com/br/java/technologies/downloads/) e faça o download.

2. **Instale o Java 17**
   - Siga as instruções do seu sistema operacional.

### Instalação do Spring Boot

Primeiramente, faça o clone do repositório:
```
https://github.com/cpt-ufal-arapiraca/ace6-alocacao-salas.git
```
Feito isso, acesse o projeto:
```
cd ace6-alocacao-salas/BackEnd
```
É preciso compilar o código e baixar as dependências do projeto:
```
mvn clean package
```
Finalizado esse passo, vamos iniciar a aplicação:
```
mvn spring-boot:run
```
Pronto. A aplicação está disponível em http://localhost:8080
```
Tomcat started on port(s): 8080 (http)
Started AppConfig in xxxx seconds (JVM running for xxxx)
```
#

## 📦 Implantação

%%

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Maven](https://maven.apache.org/) - Gerente de Dependência

## 📌 Versão

Nós usamos [GitFlow](https://git-scm.com/) para controle de versão. Para as versões disponíveis, observe as [tags neste repositório](https://github.com/cpt-ufal-arapiraca/ace6-alocacao-salas/releases). 

## ✒️ Autores

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início

* **Douglas** - *Java e Spring Boot* - [https://github.com/Douglas-Alv3s](https://github.com/Douglas-Alv3s)
* **Roberto** - *Banco de dados* - [https://github.com/jrobertogram](https://github.com/jrobertogram)
* **Luckas** - *Font end* - [https://github.com/Luckas-Ferreira](https://github.com/Luckas-Ferreira)
* **Wellington** - *Documentação e UI/UX* - 

Você também pode ver a lista de todos os [colaboradores](https://github.com/cpt-ufal-arapiraca/ace6-alocacao-salas/colaboradores) que participaram deste projeto.

