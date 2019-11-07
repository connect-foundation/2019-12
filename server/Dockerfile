FROM node:12.13.0-alpine

COPY package.json /src/package.json
RUN cd /src; npm install

COPY src /src/server
COPY test /src/test
WORKDIR /src

CMD npm run start
EXPOSE 3000
