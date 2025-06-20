FROM php:8.2-fpm-alpine

# ADICIONAMOS ESTA LINHA para instalar as dependências do PostgreSQL
RUN apk add --no-cache postgresql-dev

# Instala extensões PHP necessárias (esta linha agora vai funcionar)
RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql

# Instala o Composer (gerenciador de pacotes do PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html