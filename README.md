## How to start project

1. Prepare yuor `.env` file:

`REACT_APP_API_URL=http://localhost:3333/api/` or host and port when your back part

2. Install npm deps: `npm install`
3. Run project: `npm start`

## Running in prod via docker

1. Prepare yuor `.env` file:

`REACT_APP_API_URL=http://localhost:3333/api/` or host and port when your back part

2. Change permission for shell script: `chmod +x ci/deploy.sh`
3. Start the project with: `ci/deploy.sh`