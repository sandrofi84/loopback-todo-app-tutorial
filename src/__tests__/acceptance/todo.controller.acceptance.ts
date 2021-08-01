import {Client, expect} from '@loopback/testlab';
import {TodoListApplication} from '../..';
import {DbDataSource} from '../../datasources';
import {givenEmptyDB} from '../helpers/database.helpers';
import {givenTodo, givenTodoData} from '../helpers/todo.helpers';
import {setupApplication} from './test-helper';


describe('TodoController (acceptance)', () => {
  const datasource = new DbDataSource();

  let app: TodoListApplication;
  let client: Client;

  // The database is cleared before each test
  beforeEach('givenEmptyDatabase', async () => {
    await givenEmptyDB(datasource);
  })

  before('setup application', async () => {
    ({ app, client } = await setupApplication());
  });

  // The database is cleared after the last test
  after(async () => {
    await givenEmptyDB(datasource);
    await app.stop();
  });

  describe('GET /todos', () => {
    it('returns an array of todos', async () => {
      // given a todo in the DB
      const todo = await givenTodo(datasource, {title: "test todo"});
      // with properties:
      const props: string[] = [];
      for (const key in todo) {
        props.push(key);
      }

      // when making a request to /todos
      const response = await client
        .get('/todos')
        .expect(200);

      // then return an array of todos
      expect(response.body).Array();
      expect(response.body[0]).to.have.properties(props)
    });
  });

  describe('GET /todos?title={title}', () => {
    it('returns a todo with the specified title', async () => {
      // given a todo with title "get bananas" in the DB
      await givenTodo(datasource, {title: "get bananas"});

      // when making a query for todo with title "get bananas"
      const response = await client
        .get('/todos?title=get%20bananas')
        .expect(200);

      // then return the todo with title "get bananas"
      expect(response.body[0].title).eql("get bananas");
    });
  });

  describe('POST /todos', () => {
    it('creates a todo in the database', async () => {
      // given some Todo data
      const todoData = givenTodoData();

      // when making a POST request to post the Todo data
      const response = await client
        .post('/todos')
        .send(todoData)
        .set('Accept', 'application/json')
        .expect(200);

      // then return the newly created Todo
      expect(response.body).containDeep(todoData);
      expect(response.body).to.have.property("id");
    });
  });


})
