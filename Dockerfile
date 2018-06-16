FROM node:8-slim

# Port forward
EXPOSE 3000

# Create application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copy rest of application
COPY . /usr/src/app/

# Build frontend
RUN npm run build

# Start application
CMD npm start
