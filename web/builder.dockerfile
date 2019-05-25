FROM node:8
COPY ./package.json /web/package.json
COPY ./package-lock.json /web/package-lock.json
COPY ./tslint.json /web/tslint.json
COPY ./tsconfig.json /web/tsconfig.json
COPY ./webpack.config.js /web/webpack.config.js
COPY ./src /web/src
COPY ./static /web/static

WORKDIR /web

RUN npm i
CMD npm run build
