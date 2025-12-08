# Binance Trading Frontend Panel

### 🔗 Backend (Java + Spring Boot)

Este panel consume la API del backend Java, la cual está poblada con información real del order book de Binance:
➡️ **https://github.com/santi-cortes/binance-backend-java.git**

---

## 📌 Descripción del proyecto

Este es un panel frontend ligero hecho con **Vite + React**, diseñado para conectarse al backend en Java que expone datos reales del order book de Binance (TURBO/USDT).

El panel muestra precios, spreads, presión de mercado y otros indicadores relevantes en tiempo real.

---

## 🚀 Instrucciones para ejecutar este frontend utilizando SOLO la imagen Docker

Asegúrate de que tu backend (Java) ya esté corriendo y exponga su API —por ejemplo:

`bash
http://localhost:8080/api/depth
`

### 1. Construir la imagen Docker

Desde la raíz del proyecto:

`bash
docker build -t binance-frontend .
`

### 2. Ejecutar la imagen Docker

`bash
docker run -d -p 5173:80 --name binance-frontend binance-frontend
`

El panel estará disponible en:

➡️ **http://localhost:5173**

---

## 🧩 Variables de entorno (si necesitas cambiar el backend)

Puedes definir la URL del backend al construir tu imagen:

`bash
docker build --build-arg VITE_BACKEND_URL="http://host.docker.internal:8080" -t binance-frontend .
`

O al ejecutar:

`bash
docker run -d -p 5173:80 -e VITE_BACKEND_URL="http://localhost:8080" binance-frontend
`

---

## 📦 Estructura del proyecto

`text
src/
 ├─ components/        # Componentes UI
 ├─ pages/             # Vistas principales
 ├─ services/          # Conexión al backend
 ├─ hooks/             # Custom hooks
 └─ utils/             # Utilidades varias
`

---

## 🛠 Scripts principales

Desarrollo:

`bash
npm run dev
`

Build:

`bash
npm run build
`

Previsualización:

`bash
npm run preview
`

---

## 🐳 Archivo Dockerfile utilizado

``dockerfile

# 1. Build del frontend

FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Servir con nginx

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
``

---

## 📞 Soporte

Cualquier duda, puedes preguntar sin problema.
