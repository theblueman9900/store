# Stage 1: Build the app
FROM node:18 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the environment file and other code
COPY .env.production .env
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Run the app in production
FROM node:18 AS runner

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["pnpm", "start"]
