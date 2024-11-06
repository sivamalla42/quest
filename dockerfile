# Base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Add the custom certificate and update CA certificates
# COPY rearc.crt /usr/local/share/ca-certificates/rearc.crt
# RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates && rm -rf /var/lib/apt/lists/*

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

ENV SECRET_WORD="TwelveFactor"