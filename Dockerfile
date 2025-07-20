FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@9.15.4

COPY . .

RUN pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
