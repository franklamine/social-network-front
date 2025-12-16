# Étape 1 : builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


# Étape 2 : serveur Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier le fichier de configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Pour Let’s Encrypt challenge
RUN mkdir -p /var/www/certbot

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
