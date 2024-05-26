# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Install turbo globally
RUN npm install -g turbo

# Copy the monorepo's package.json, pnpm-lock.yaml, and pnpm-workspace.yaml
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy the entire monorepo (this is necessary to resolve workspace packages)
COPY apps ./apps
COPY packages ./packages

# Set the working directory to the API
WORKDIR /app/apps/api

# Install dependencies
RUN pnpm install

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["node", "dist/index.js"]
