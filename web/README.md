# Web

This is the website portion of this project. It was built using Angular as the framework, and using Docker as a development and deployment environment.

## Development Environment

0. Make sure that you are in the `web` directory.
1. `docker build --target development -t web-dev .`
2. `docker run --rm -it -v $(pwd)/app:/app -p 4200:4200 web-dev:latest`
3. (Inside the container) `npm install`

    Note: This only needs to be done once, as it installs all required modules into the locally mounted directory.

4. (Inside the container) `ng serve --watch --host 0.0.0.0`

## Deployment

Refer to the main project's `README.md` for running in production.
