FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY .yarn/ ./.yarn/
COPY .yarnrc.yml ./

RUN yarn install

COPY build/ ./
VOLUME [ "/app/config.yaml" ]
CMD [ "yarn", "start-docker" ]
