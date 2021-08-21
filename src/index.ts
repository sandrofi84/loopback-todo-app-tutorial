import {ApplicationConfig, TodoListApplication} from './application';

export * from './application';

require('dotenv').config();

const oauth2Providers = process.env.OAUTH_PROVIDERS_LOCATION ? require(process.env.OAUTH_PROVIDERS_LOCATION) : null;

export async function main(options: ApplicationConfig = {}) {

  const app = new TodoListApplication(options);
  app.bind('facebookOAuth2Options').to(options.facebookOptions);
  app.bind('customOAuth2Options').to(options.oauth2Options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
    facebookOptions: oauth2Providers ? oauth2Providers['facebook-login'] : null,
    oauth2Options: oauth2Providers ? oauth2Providers['oauth2'] : null,
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
