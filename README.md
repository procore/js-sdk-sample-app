# Node Procore Boilerplate
An example on how to use `node-procore`. Comes complete with login routes and resource viewer.

## Dependiences
```
brew install yarn
yarn install
touch .env
```
### Environment
```
CIENT_ID
CLIENT_SECRET
REDIRECT_URL
SESSION_PASSWORD
```
## Development
`npm run dev`

## Production
1. `npm run rollup:build`
2. `npm run server`

## Routes
`GET /sessions/create`
Starts oauth authorization with procore

`GET /oauth/procore/consume`
The registred redirect uri

`POST /sessions/refresh`
Refreshes the current auth token and saves to app session

`GET /public/{param*}`
Used for public assets eg css, js, images

