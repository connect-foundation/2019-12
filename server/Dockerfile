FROM node:12.13.0-alpine

COPY package.json /server/package.json
RUN cd /server; npm install

COPY src /server/src
COPY test /server/test
WORKDIR /server

CMD npm run start
EXPOSE 3000
