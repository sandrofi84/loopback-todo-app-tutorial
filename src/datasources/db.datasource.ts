import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db',
  connector: 'memory',
  localStorage: '',
  file: './data/db.json'
};

const testConfig = {
  name: 'db',
<<<<<<< HEAD
  connector: 'mongodb',
  url: '',
  host: '127.0.0.1',
  port: 27017,
  user: '',
  password: '',
  database: 'todo-app',
  useNewUrlParser: true

=======
  connector: 'memory',
  localStorage: '',
  file: './data/test-db.json'
>>>>>>> aca9f908b8d42394c6ca4f5a40d5335cc6a49bde
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = process.env.npm_lifecycle_event === 'test' ? testConfig : config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = process.env.npm_lifecycle_event === 'test' ? testConfig : config,
  ) {
    super(dsConfig);
  }
}
