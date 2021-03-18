FROM node:15 as development
WORKDIR /app
RUN npm install -g @angular/cli@~11.2.3
COPY app .
RUN npm install
CMD ["/bin/bash"]

FROM development as builder
RUN ng build --prod
CMD ["/bin/bash"]

FROM nginx:1.19 as production
COPY --from=builder /app/dist/app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf