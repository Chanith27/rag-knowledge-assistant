# Use Node.js base image
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Install dependencies needed for some node modules and pdf-parse
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Command to run the app
CMD ["npm", "run", "serve"]
