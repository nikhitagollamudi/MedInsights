FROM node:18.13
WORKDIR /app
COPY package.json ./
RUN npm install
COPY .env .env
COPY . .
RUN node build.mjs

CMD ["node", "dist/index.js"]