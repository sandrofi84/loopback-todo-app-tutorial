import {Client, expect} from '@loopback/testlab';
import {TodoListApplication} from '../..';
import {DbDataSource} from '../../datasources';
import {givenTodo, givenTodoData} from '../helpers/todo.helpers';
import {setupApplication} from './test-helper';


describe('TodoController (acceptance)', () => {
  const datasource = new DbDataSource();

  let app: TodoListApplication;
  let client: Client;


  // beforeEach('givenEmptyDatabase', async () => {
  //   await givenEmptyDB(datasource);
  // })

  // afterEach('givenEmptyDatabase', async () => {
  //   await givenEmptyDB(datasource);
  // })

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

  describe.only('GET /todos?title={title}', () => {
    it('returns a todo with the specified title', async () => {
      // given a todo with title "get bananas" in the DB
      await givenTodo(datasource, {title: "get bananas"});

      // when making a query for todo with title "get bananas"
      const response = await client
        .get('/todos?title=get%20bananas')
        .expect(200);

      // then return the todo with title "get bananas"
      expect(response.body[0]).to.have.property("title");
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
