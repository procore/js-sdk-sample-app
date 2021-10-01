const clientOptions = {
  apiHostname: process.env.BASE_URL
};

const oauthClientOptions = {
  apiHostname: process.env.OAUTH_URL
};

export { clientOptions, oauthClientOptions };
