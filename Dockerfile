FROM node:18-alpine as builder

WORKDIR /app
COPY . .

RUN yarn install && yarn build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarn/ ./.yarn/
COPY --from=builder /app/.yarnrc.yml ./
COPY --from=builder /app/build/ ./

RUN yarn install && mkdir data

VOLUME [ "/app/config.yaml" ]
CMD [ "yarn", "start-docker" ]
