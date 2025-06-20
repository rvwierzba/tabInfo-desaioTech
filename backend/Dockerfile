# Usaremos a imagem oficial do PHP que já vem com o servidor Apache.
# Ela é baseada em Debian, então usamos 'apt-get' em vez de 'apk'.
FROM php:8.2-apache

# Instala as dependências de sistema necessárias para as extensões do PHP.
# 'libpq-dev' é o nome do pacote para PostgreSQL no Debian.
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql

# Copia o código da nossa aplicação para a pasta raiz do servidor Apache.
COPY src/ /var/www/html/

# Habilita o módulo 'rewrite' do Apache para que nosso .htaccess funcione.
RUN a2enmod rewrite

# A imagem base do Apache já expõe a porta 80, então não precisamos fazer mais nada.