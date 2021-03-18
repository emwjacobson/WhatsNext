FROM node:15 as development
WORKDIR /app
RUN chown -R node:node /app
RUN npm install -g @angular/cli@~11.2.3
USER node
COPY --chown=node:node app .
CMD ["/bin/bash"]

FROM development as builder
RUN npm install
RUN ng build --prod

FROM nginx:1.19 as production
COPY --from=builder /app/dist/app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf