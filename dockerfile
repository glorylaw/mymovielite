FROM node:12-alpine 
WORKDIR /app
COPY package.json /app/
RUN yarn
COPY . .
RUN npx tsc

EXPOSE 3000
CMD ["yarn","start"]