# JS SDK Sample Application

An example on how to use [`@procore/js-sdk`](https://www.npmjs.com/package/@procore/js-sdk). Comes complete with login routes and resource viewer.

### Environment

```bash
CLIENT_ID=<Application CLIENT ID>
CLIENT_SECRET=<Application CLIENT SECRET>

BASE_URL=<Procore API host>
OAUTH_URL=<Procore OAuth host>

REDIRECT_URI=<Valid Application REDIRECT URI>
PORT=<localhost port to run sample app. http://localhost:PORT>

SESSION_PASSWORD=<Used to encrypt session>
```

Example:
```bash
CLIENT_ID=c74b...bc3
CLIENT_SECRET=251...60b

BASE_URL=https://api.procore.com
OAUTH_URL=https://login.procore.com

# You must include `/oauth/procore/callback` in the REDIRECT_URI
# for this sample application to work correctly.
REDIRECT_URI=http://localhost:3000/oauth/procore/callback
PORT=3000

SESSION_PASSWORD=Strong^^123~Pass
```

* CLIENT_ID and CLIENT_SECRET values are provided when [creating an application](https://developers.procore.com/documentation/new-application) in the Procore Developer Portal. Navigate to https://developers.procore.com/developers and select the application. The CLIENT_ID can be found on the `Manage App` page in the `Sandbox OAuth Credentials` or `Production OAuth Credentials` section. Note that the CLIENT_SECRET for production is only available during application creation or when reseting client secret.
* The BASE_URL and the OAUTH_URL will depend on which environment you're accessing. If you're working in the production environment, the BASE_URL will be https://api.procore.com and the OAUTH_URL will be https://login.procore.com. For the sandbox environment, both the BASE_URL and the OAUTH_URL should be set to https://sandbox.procore.com.
* The REDIRECT_URI's domain should match the domain of your application, and the full path must be added as an authorized redirect uri for your app in the developer portal. The complete REDIRECT_URI must be in the `Redirect URI` textarea in the `Sandbox OAuth Credentials` or `Production OAuth Credentials` section.
* After these values have been configured within the `.env` file, make sure to save your changes.

## Development

Run the following command from the root of the repo.

```shell
npm run start
```

## Production

Run the following commands from the root of the repo.

```shell
npm run build
npm run serve
```

## Run js-sdk-sample-app in Docker Container

Install Docker Desktop
 * https://docs.docker.com/desktop/install/mac-install/
 * https://docs.docker.com/desktop/install/windows-install/
 * https://docs.docker.com/desktop/install/linux-install/

Run the following commands from the root of the repo.
Make sure a valid `.env` file is in the `/packages/server` directory before running these commands.
Make sure that the port in docker-compose.yml matches the port in the `/packages/server/.env` file.

*Start Docker Container*
```shell
BUILDKIT_PROGRESS=plain docker compose up -d --force-recreate --build --remove-orphans
```

Once the docker container has started you can follow instructions in `Open Sample Application`.

*Stop Docker Container*
```shell
docker compose down -t 0
```

## Open Sample Application

Open a browser and navigate to `http://localhost:3000/` assuming you have PORT set to `3000`.

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
