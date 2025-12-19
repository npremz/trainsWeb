# Build stage
FROM node:25-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:25-alpine AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4323

EXPOSE 4323

CMD ["serve", "dist", "-l", "4323"]
