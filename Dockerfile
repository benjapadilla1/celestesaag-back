FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port (Railway sets PORT env var automatically)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]