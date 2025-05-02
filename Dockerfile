# Etapa 1: construir la app Angular
FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --output-path=docs
RUN mv docs/browser/*.* docs

# Etapa 2: servir con nginx
FROM nginx:alpine
COPY --from=builder /app/docs /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
