# Whats Next?

Whats Next is a tool that was developed to try and help myself organize the information from all of my classes better. I started out using a spreadsheet with multiple pages, one for each class, and as I added more items it would get messy. I also had a 'kanban' board page where I could track all of the work that I needed to do.

My goal is to make a single location where I can easily see the classes I am taking. Each page would have any relavent links (like to the Syllabus, Zoom links, or homework sites), as well as any notes I have on the class, such as meeting times.

The other goal is to setup an interactive kanban board to track classes, similar to Github's for managing pull requests and issues.

## Technologies

### Frontend
* Angular - Frontend Javascript framework
* Docker - For deployment and a development environment

### Backend
* Appwrite - A self-hosted Firebase alternative

## Backend

For the backend we are using [AppWrite](https://appwrite.io/), a self-hosted backend service that is comparable to Google's Firebase.

### Appwrite Setup

1. Run the setup per the [Appwrite Documentation](https://appwrite.io/docs/installation)
```
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:0.7.2
```
This step creates a new folder, `appwrite`, that contains a `docker-compose.yml` and `.env` file. Per the Appwrite [production practices](https://appwrite.io/docs/production), in the `.env` file set `_APP_CONSOLE_WHITELIST_EMAILS=` and/or `_APP_CONSOLE_WHITELIST_IPS` to your email/IP to limit registration.

To update the running services, run `docker-compose up -d --remove-orhpans`. This can also be run in the future to restart Appwrite. To stop the services, run `docker-compose down`.

2. Create an account with the local Appwrite server by visiting `https://localhost/`.
3. Create a new project. In the homepage of the project, go to Settings and take note of the Project ID.
4. In the API Keys tab of the project, create a new key with the permissions for `functions.read` and `functions.write`.
5. Run `docker run --rm -it -v $(pwd)/appwrite:/appwrite -u node -e "ENDPOINT=https://YOUR_ENDPOINT/v1" -e "PROJECT_ID=YOUR_PROJECT_ID" -e "SECRET_KEY=YOUR_SECRET_KEY" --network host node:15 /bin/bash` replacing `YOUR_ENDPOINT`, `YOUR_PROJECT_ID`, and `YOUR_SECRET_KEY`.
6. (Within container) `cd /appwrite`, `npm install`, `npm start`


## Frontend

The website portion of this project was built as a PWA. I made this decision as I wanted the website to be highly responsive as well as work offline.

I used docker as a development environment to make life easier as well as making things highly portable.