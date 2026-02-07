FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# COPY . . se sari files (server.js, .env, script.js) andar chali jayengi
COPY . . 
EXPOSE 3000
CMD ["node", "server.js"]
