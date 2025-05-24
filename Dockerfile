# Stage 1: Build the Angular application
FROM node:14 as builder
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application for production
# The output directory is specified in angular.json: "outputPath": "dist/csv-process"
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy built Angular app from the 'builder' stage
COPY --from=builder /app/dist/csv-process .

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]