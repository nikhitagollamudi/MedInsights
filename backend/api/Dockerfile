FROM node:18.13

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install npm packages
RUN npm install


# Copy the rest of your application code
COPY . .

EXPOSE 3000

# Specify the command to run your application
CMD ["npm", "run", "start"]