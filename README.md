# JS SDK Sample Application

An example on how to use [`@procore/js-sdk`](https://www.npmjs.com/package/@procore/js-sdk). Comes complete with login routes and resource viewer.

## Dependencies

If yarn is not installed run the following shell command.

```shell
brew install yarn
```

```shell
yarn install
cp packages/server/.env.example packages/server/.env
```

### Environment

```text
CLIENT_ID=<Application CLIENT ID>
CLIENT_SECRET=<Application CLIENT SECRET>

BASE_URL=<Procore API host>
OAUTH_URL=<Procore OAuth host>

REDIRECT_URI=<Valid Application REDIRECT URI>
PORT=<localhost port to run sample app. http://localhost:PORT>

SESSION_PASSWORD=<Used to encrypt session>
```

* CLIENT_ID and CLIENT_SECRET values are provided when [creating an application](https://developers.procore.com/documentation/new-application) in the Procore Developer Portal.
* The BASE_URL and the OAUTH_URL will depend on which environment you're accessing. If you're working in the production environment, the BASE_URL will be https://api.procore.com and the OAUTH_URL will be https://login.procore.com.
* The REDIRECT_URI's domain should match the domain of your application, and the full path must be added as an authorized redirect uri for your app in the developer portal.
* After these values have been configured within the `.env` file, make sure to save your changes.

## Development

```shell
yarn start
```

## Production

```shell
yarn build
yarn serve
```

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
