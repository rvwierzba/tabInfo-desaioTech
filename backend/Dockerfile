# Usaremos a imagem oficial do PHP que já vem com o servidor Apache.
FROM php:8.2-apache

# ATUALIZAÇÃO AQUI: apt-get upgrade -y atualiza todas as bibliotecas do sistema
# para as versões mais recentes, incluindo as de SSL, antes de instalar nossas extensões.
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql

# Copia o código da nossa aplicação para a pasta raiz do servidor Apache.
COPY src/ /var/www/html/

# Habilita o módulo 'rewrite' do Apache para que nosso .htaccess funcione.
RUN a2enmod rewrite