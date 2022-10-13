FROM node:17

WORKDIR /app/src/
COPY ./package* .
RUN npm install
COPY . .

RUN npm run build
CMD ["npm", "run", "start"]
