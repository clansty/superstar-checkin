FROM node:16 as builder

WORKDIR /app
COPY . .

RUN yarn install && yarn build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarn/ ./.yarn/
COPY --from=builder /app/.yarnrc.yml ./

RUN yarn install

COPY --from=builder /app/build/ ./
VOLUME [ "/app/config.yaml" ]
CMD [ "yarn", "start-docker" ]
