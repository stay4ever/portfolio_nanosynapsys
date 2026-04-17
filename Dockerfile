FROM node:22.14-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --include=optional
COPY . .
RUN npm run build

FROM node:22.14-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .
ENV HOST=0.0.0.0
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
