# syntax=docker/dockerfile:1.6
# Multi-stage build: build Vue app with Node, serve via NGINX on port 5173

# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc,required=false npm ci

# Copy source (including .env.local for VITE_* at build time)
COPY . .

# Optional build-time args for VITE_* (overrides .env.local if provided)
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE
ARG VITE_USE_PROXY=true

# Build static assets (prefer .env.local; override via build args if provided)
RUN VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN \
	VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID \
	VITE_AUTH0_AUDIENCE=$VITE_AUTH0_AUDIENCE \
	VITE_USE_PROXY=$VITE_USE_PROXY \
	npm run build

# --- Serve stage ---
FROM nginx:alpine

# NGINX config with SPA fallback and listen on 5173
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]