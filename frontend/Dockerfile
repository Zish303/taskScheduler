FROM node:20.15.1 as node

WORKDIR /usr/src/app

COPY . .
RUN npm install -g @angular/cli
RUN npm install
RUN npm run build

FROM httpd:latest
COPY --from=node /usr/src/app/dist/frontend/browser /usr/local/apache2/htdocs
