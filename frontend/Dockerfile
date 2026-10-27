# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app
 
COPY package*.json .
RUN npm ci
 
COPY . .
# VITE_API_URL (or REACT_APP_API_URL if using CRA) gets baked in at build time
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build
 
# --- Runtime stage ---
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
