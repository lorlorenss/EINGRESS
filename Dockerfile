# First stage: Build the Angular application
FROM node:20-alpine as angular

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Verify Node.js version
RUN node -v

RUN npm run build

# Second stage: Serve the built application using Apache
FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/eingress-project .
