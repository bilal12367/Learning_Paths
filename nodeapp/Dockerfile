FROM node:20-alpine

WORKDIR /home/nodeapp

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]