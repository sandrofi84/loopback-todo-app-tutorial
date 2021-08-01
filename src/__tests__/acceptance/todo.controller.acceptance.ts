import {Client, expect} from '@loopback/testlab';
import {TodoListApplication} from '../..';
import {DbDataSource} from '../../datasources';
import {givenEmptyDB} from '../helpers/database.helpers';
import {givenTodoData} from '../helpers/todo.helpers';
import {setupApplication} from './test-helper';


describe('TodoController (acceptance)', () => {
  const datasource = new DbDataSource();

  let app: TodoListApplication;
  let client: Client;


  beforeEach('givenEmptyDatabase', async () => {
    await givenEmptyDB(datasource);
  })

  afterEach('givenEmptyDatabase', async () => {
    await givenEmptyDB(datasource);
  })

  before('setup application', async () => {
    ({ app, client } = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  describe('GET /todos', () => {
    it('returns an array of todos', async () => {
      const response = await client
        .get('/todos')
        .expect(200);

      console.log(response.body);

      expect(response.body).Array();
    });
  });

  describe('POST /todos', () => {
    it('creates a todo in the database', async () => {
      const todoData = givenTodoData();

      const response = await client
        .post('/todos')
        .send(todoData)
        .set('Accept', 'application/json')
        .expect(200);

      expect(response.body).containDeep(todoData);
      expect(response.body).to.have.property("id");
    });
  });


})
