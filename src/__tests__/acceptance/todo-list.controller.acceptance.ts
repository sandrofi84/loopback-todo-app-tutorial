import {Client, expect} from '@loopback/testlab';
import {TodoListApplication} from '../..';
import {DbDataSource} from '../../datasources';
import {Color} from '../../enums/todo-list-enums';
import {givenEmptyDB} from '../helpers/database.helpers';
import {givenTodoList, givenTodoListData} from '../helpers/todo-list.helpers';
import {setupApplication} from './test-helper';


describe('TodoListController (acceptance)', () => {
  const datasource = new DbDataSource();

  let app: TodoListApplication;
  let client: Client;

  // The database is cleared before each test
  beforeEach('givenEmptyDatabase', async () => {
    await givenEmptyDB(datasource);
  });

  before('setup application', async () => {
    ({ app, client } = await setupApplication());
  });

  // The database is cleared after the last test
  after(async () => {
    await givenEmptyDB(datasource);
    await app.stop();
  });

  describe('GET /todo-lists', () => {
    it('returns an array of todo-lists', async () => {
      // given a TodoList in the DB
      const todoList = await givenTodoList(datasource, {title: "test todo-list"});
      // with properties:
      const props: string[] = [];
      for (const key in todoList) {
        props.push(key);
      }

      // when making a request to /todo-lists
      const response = await client
        .get('/todo-lists')
        .expect(200);

      // then return an array of TodoLists
      expect(response.body).Array();
      expect(response.body[0]).to.have.properties(props)
    });
  });

  describe('GET /todo-lists/{id}', () => {
    it('returns a todo-list with the corresponding id', async () => {
      // given a TodoList in the DB with property id
      const todoList = await givenTodoList(datasource, {title: "test todo-list"});


      // when making a GET request to /todo-lists/{id}
      const response = await client
        .get(`/todo-lists/${todoList.id}`)
        .expect(200);

      // then return the TodoList with the corresponding id
      expect(response.body.id === todoList.id?.toString()).eql(true);
    });
  });

  describe('POST /todo-lists', () => {
    it('creates a todo-list in the database', async () => {
      // given some Todo data
      const todoListData = givenTodoListData();

      // when making a POST request to post the TodoList data
      const response = await client
        .post('/todo-lists')
        .send(todoListData)
        .set('Accept', 'application/json')
        .expect(200);

      // then return the newly created TodoList
      expect(response.body).containDeep(todoListData);
      expect(response.body).to.have.property("id");
    });

    it('throws a validation error if the color property is not valid', async () => {
      // given some TodoList data with invalid color value
      const todoListData = givenTodoListData({title: "list with wrong color", color: "blue" as Color});

      // when making a POST request to post the TodoList data
      const response = await client
        .post('/todo-lists')
        .send(todoListData)
        .set('Accept', 'application/json');

      // then return an error
      expect(response.error).to.not.eql(false);
    });
  });


})
