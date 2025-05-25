# Stage 1: Use a lightweight Nginx image as the base
FROM nginx:alpine

# Remove default Nginx static assets
# This ensures that only your application's files are served.
RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled output from your 'production_build' directory
# to the Nginx HTML directory where it serves files from.
# Make sure your 'production_build' directory is in the same location as this Dockerfile.
COPY / /usr/share/nginx/html

# Expose port 80 (the default HTTP port Nginx listens on)
EXPOSE 80

# Command to start Nginx in the foreground when the container launches
CMD ["nginx", "-g", "daemon off;"]