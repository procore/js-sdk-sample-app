# Node Procore Boilerplate
An example on how to use [`@procore/js-sdk`](https://www.npmjs.com/package/@procore/js-sdk). Comes complete with login routes and resource viewer.

![demo video](https://github.com/procore/node-procore-boilerplate/blob/master/demo.gif)

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

`GET /oauth/procore/callback`
The registred redirect uri

`POST /oauth/procore/refresh`
Refreshes the current auth token and saves to app session

`GET /public/{param*}`
Used for public assets eg css, js, images


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/procore/js-sdk-sample-app. This project is
intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the
[Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## About Procore

<img
  src="https://www.procore.com/images/procore_logo.png"
  alt="Procore Logo"
  width="250px"
/>

Manage Version is maintained by Procore Technologies.

Procore - building the software that builds the world.

Learn more about the #1 most widely used construction management software at [procore.com](https://www.procore.com/)
