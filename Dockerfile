FROM node:16-alpine as builder

WORKDIR /app
COPY . .

RUN apk add git
RUN yarn install
RUN yarn build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarn/ ./.yarn/
COPY --from=builder /app/.yarnrc.yml ./
COPY --from=builder /app/build/ ./

RUN yarn install && mkdir data

VOLUME [ "/app/config.yaml" ]
CMD [ "yarn", "start-docker" ]
