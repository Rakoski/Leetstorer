FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json pnpm*.yaml ./

RUN npm install -g pnpm && \
    pnpm install

COPY . .

EXPOSE 3001 4000

CMD [ "turbo", "dev" ]