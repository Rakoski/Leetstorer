FROM node:18

WORKDIR /app

RUN npm install -g pnpm

RUN npm install -g turbo

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps ./apps
COPY packages ./packages

WORKDIR /app/apps/api

RUN pnpm install

EXPOSE 4001

CMD ["node", "dist/index.js"]