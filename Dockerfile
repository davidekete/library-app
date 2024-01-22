# Step 1: Build the React application
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to workdir
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Build the application
RUN npm run build

# Step 2: Set up the server to serve the React build assets
FROM nginx:1.19-alpine

# Copy the build assets from the build stage into the Nginx server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access the application
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]