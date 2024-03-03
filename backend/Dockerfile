# Specify the base image
FROM node:21.6.0

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your NestJS application
RUN npm run build

# Expose port 3000 to the outside once the container has launched
EXPOSE 3000

# Define the command to run your app (adjust if your main file has a different name)
CMD ["node", "dist/main.js"]
