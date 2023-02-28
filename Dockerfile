FROM node:16-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install -g dotenv env eslint eslint-config-next mongodb @sendgrid/mail twilio @auth0/nextjs-auth0 react-chartjs-2 next react react-dom
COPY . ./
CMD npm run build && npm start -- --port 80
