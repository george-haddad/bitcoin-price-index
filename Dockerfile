FROM nginx:1.22-alpine

WORKDIR /
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]