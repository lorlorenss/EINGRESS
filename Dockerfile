# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /src/app

# Copy package.json and package-lock.json to /src/app
COPY package.json package-lock.json /src/app/

# Install dependencies
RUN npm install --production

# Install global dependencies
RUN npm install -g @nestjs/cli @angular/cli

# Verify NestJS CLI installation
RUN nest -v

# Install additional dependencies
RUN npm install bcrypt
RUN npm install @nestjs/jwt
RUN npm i --save @nestjs/config
RUN npm install --save @nestjs/typeorm typeorm pg
RUN npm install --save-dev @types/multer
RUN npm i uuid --save
RUN npm install @nestjs/platform-express

# Copy the rest of the application code to /src/app
COPY . /src/app

# Copy .env file to /src/app
COPY .env /src/app/.env

# Expose the application port (using port 80 for production)
EXPOSE 80

# Build the Angular app
RUN npm run build

# Start the application (replace with your start script if different)
CMD ["npm", "run", "start:prod"]
