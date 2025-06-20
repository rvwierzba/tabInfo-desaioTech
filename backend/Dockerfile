FROM php:8.2-fpm-alpine

# Instala extensões PHP necessárias
RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql

# Instala o Composer (gerenciador de pacotes do PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html