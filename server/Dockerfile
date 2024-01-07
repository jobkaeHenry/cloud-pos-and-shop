# Import Node 18 images
FROM node:18-alpine as base

FROM base as deps
# Declare root directory
WORKDIR /app

COPY package.json .

# Install dependencies
RUN npm install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules 
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

# Run production server 
CMD ["node", "main.js"]