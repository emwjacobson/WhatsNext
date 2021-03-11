# Web

This is the website portion of this project. It was built using Angular as the framework, and using Docker as a development and deployment environment.

## Development Environment

1. `docker build -f Dockerfile-dev -t web-dev .`
2. `docker run --rm -it -v $(pwd)/app:/app -p 4200:4200 web-dev ng serve --watch --host 0.0.0.0`
2. `docker run --rm -it -v $(pwd)/app:/app -p 4200:4200 web-dev`

## Deployment

TODO
