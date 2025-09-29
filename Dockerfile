FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@9.15.4

COPY . .

RUN pnpm install --frozen-lockfile

EXPOSE 3210

CMD ["pnpm", "run", "dev"]
