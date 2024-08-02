# Instruções para o desenvolvimento de projetos de ACE
Especificações para o desenvolvimento dos projetos das ACEs 6 e 7 do curso de Ciência da Computação da UFAL-Campus Arapiraca
## Começando
A modalidade PROJETO faz parte do programa de extensão do curso de Ciência da Computação de Arapiraca. 
Atividades de extensão na modalidade projeto são ações que envolvem a realização de projetos práticos e concretos com o objetivo de atender as necessidades da comunidade,
promover o desenvolvimento sustentável, aplicar conhecimentos acadêmicos em situações do mundo real e estabelecer conexões entre a instituição de ensino e a sociedade. 
A atividade será composta por desenvolvimento de softwares que possam auxiliar a comunidade local. 
Esses projetos serão organizados e realizados em ACE6(72h) e ACE7 (72h), sexto e sétimo períodos, respectivamente. 
## Práticas de gestão de projetos
Utilize Scrum para o desenvolvimento do projeto com sprints semanais. O backlog e sprints devem ser definidas no modelo disponibilizado no Jira.
## Tecnologias e arquitetura
1. **FrontEnd**: React ou React Native ou Flutter  
2. **BackEnd**: Python** e/ou Java como os frameworks Django/Flask(Python) e Spring(Java).
5. **Banco de dados**: MariaDB
6. **Modelo de arquitetura**: API REST(Representational State Transfer) e SOA(Service Oriented Architecture).
## Para começar a executar o projeto
1. Usar o modelo disponibilizado no Confluence para especificação de requisitos.
2. Usar diagramas de caso de uso, diagrama ER e diagrama bpmn como artefato de modelagem.
3. Definir uma ferramenta para testes de aceitação, preferencialmente, ou teste unitários
## Tecnologias adicionais
1. Tanto a camada da aplicação, quanto do banco de dados, devem ser especificadas em um docker-compose.
2. Uso de APIs, como GraphQL e gRPC.
3. Uso do DDD (Domain-driven design) pra modelagem estratégica.
4. Uso de infraestrutura de filas, como RabbitMQ.
