FROM node:lts as builder
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn prisma generate
RUN yarn build
CMD [ "yarn", "start:prod" ]
