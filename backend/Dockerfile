FROM node:20-slim

# Install OpenSSL and build tools for bcrypt
RUN apt-get update && apt-get install -y openssl ca-certificates python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (rebuild native modules)
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3001

# Start command
CMD npx prisma db push --skip-generate && node dist/index.js
