# ============================================
# Stage 1: Build
# ============================================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias primero (mejor cache de Docker)
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Build args para variables de entorno de Vite (se inyectan en build time)
ARG VITE_OPENROUTER_API_KEY
ENV VITE_OPENROUTER_API_KEY=$VITE_OPENROUTER_API_KEY

# Construir la app
RUN npm run build

# ============================================
# Stage 2: Servir con Nginx
# ============================================
FROM nginx:stable-alpine AS production

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos del build
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
