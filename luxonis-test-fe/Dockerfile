FROM node:16-alpine as builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
ENV NODE_ENV=production
ENV REACT_APP_API_URL=http://localhost:5000
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# nginx state for serving content
FROM nginx:alpine as runner
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets over
COPY --from=builder /app/build .
# Copy nginx configuration
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80