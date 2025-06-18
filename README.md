# Desafio Técnico: Aplicativo de Usuários (React Native + PHP)

Este é um aplicativo full-stack para gerenciamento de usuários, construído como parte de um desafio técnico. O projeto consiste em uma API RESTful em PHP servida via Docker e um aplicativo móvel em React Native para Android que consome essa API.

O aplicativo permite que um usuário se cadastre, faça login, e, uma vez autenticado, visualize uma lista de todos os usuários cadastrados no sistema.
Tecnologias Utilizadas

## Backend:

    PHP 8.2
    Nginx como servidor web
    MySQL 8.0 como banco de dados
    Docker e Docker Compose para containerização do ambiente
    Composer para gerenciamento de dependências
    firebase/php-jwt para geração de JSON Web Tokens

## Frontend:

    React Native com TypeScript
    React Navigation para o sistema de rotas e navegação
    Axios para chamadas à API
    AsyncStorage para persistência do token de autenticação

### Pré-requisitos

Antes de começar, garanta que você tem as seguintes ferramentas instaladas e configuradas na sua máquina:

    Docker Desktop
    Node.js (versão 18 ou superior)
    Ambiente de desenvolvimento Android configurado (SDK, adb, etc.)

⚙️ Configuração e Execução do Backend

O ambiente do backend é 100% containerizado com Docker, incluindo a criação automática do banco de dados e da tabela users.

1. Iniciar o Ambiente:
Navegue até a pasta backend e execute o comando:
Bash

cd backend
docker-compose up -d --build

Este comando irá construir e iniciar os contêineres do Nginx, PHP e MySQL. Na primeira execução, a base de dados desafio_db e a tabela users serão criadas automaticamente pelo script em docker/mysql/init/init.sql.

2. Verificação:
Após a conclusão, a API estará rodando e pronta para receber requisições em http://localhost:8080.
📱 Configuração e Execução do Frontend (React Native)

1. Instalando as Dependências:
Navegue até a pasta frontend e instale todos os pacotes do Node.js:
Bash

cd frontend
npm install

2. Executando o Aplicativo:
Você precisará de dois terminais abertos na pasta frontend.

    Terminal 1: Iniciar o Metro Bundler
    O Metro é o empacotador de JavaScript para o React Native. Deixe este terminal aberto.
    Bash

npx react-native start

Terminal 2: Instalar e Iniciar o App no Dispositivo/Emulador
Com um emulador Android rodando ou um dispositivo físico conectado com depuração USB, execute:
Bash

    npx react-native run-android

    O comando irá compilar o app, instalá-lo e iniciá-lo automaticamente.

    Nota importante: O aplicativo está configurado para se conectar à API no endereço http://10.0.2.2:8080. Este é o IP especial que o emulador Android usa para acessar o localhost da máquina hospedeira.

📦 Gerando o APK de Release

Para gerar o arquivo .apk final para distribuição:

    Navegue até a pasta android dentro do projeto frontend:
    Bash

cd frontend/android

Execute o comando do Gradle para montar a versão de release:
Bash

    ./gradlew assembleRelease

    (No Windows, pode ser necessário usar gradlew.bat assembleRelease)

    O APK gerado estará localizado em:
    frontend/android/app/build/outputs/apk/release/app-release.apk

### Autor

Rafael

    Email: rafaelwierzba@gmail.com
    LinkedIn: linkedin.com/in/rvwierzba

