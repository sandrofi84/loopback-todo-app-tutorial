import {Client, expect} from '@loopback/testlab';
import {TodoListApplication} from '../..';
import {setupApplication} from './test-helper';

describe('TodoController', () => {
  let app: TodoListApplication;
  let client: Client;

  before('setup application', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /todos', async () => {
    const response = await client
      .get('/todos')
      .expect(200);

    expect(response.body).Array();
  })
})
