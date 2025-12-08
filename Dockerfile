FROM node:18-alpine AS build
WORKDIR /app

# Copiar dependencias e instalarlas
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir el frontend (genera /dist)
RUN npm run build

# Servir dist con nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
