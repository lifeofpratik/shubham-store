# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the HTML, CSS, and JS files to the Nginx server directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
