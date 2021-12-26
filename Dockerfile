FROM node as builder

WORKDIR /app

COPY package.json postcss.config.js webpack.config.js yarn.lock .babelrc  ./
COPY public ./public
COPY src ./src
COPY webpack-config-builder ./webpack-config-builder

RUN yarn install
RUN yarn build

FROM node

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY server ./

RUN yarn install

EXPOSE 3000
ENTRYPOINT yarn start
