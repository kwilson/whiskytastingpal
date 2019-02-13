FROM kyma/docker-nginx
COPY ./nginx-config /etc/nginx/sites-enabled/default
COPY dist/ /var/www
CMD 'nginx'
