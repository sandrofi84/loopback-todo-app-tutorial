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
  connector: 'memory',
  localStorage: '',
  file: './data/test-db.json'
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
