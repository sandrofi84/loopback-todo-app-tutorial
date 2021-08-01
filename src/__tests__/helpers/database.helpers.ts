import {juggler} from '@loopback/repository';
import {TodoListRepository, TodoRepository} from '../../repositories';

<<<<<<< HEAD
<<<<<<< HEAD
export async function givenEmptyDB(datasource: juggler.DataSource) {
  let todoRepository: TodoRepository;
  let todoListRepository: TodoListRepository;

  await new TodoRepository(datasource, async () => todoListRepository).deleteAll();
  await new TodoListRepository(datasource, async () => todoRepository).deleteAll();
<<<<<<< HEAD
=======
export default async function givenEmptyDB(datasource: juggler.DataSource) {
=======
export async function givenEmptyDB(datasource: juggler.DataSource) {
>>>>>>> 2fd61bf... feat: create todolist helpers
  let todoRepository: TodoRepository;
  let todoListRepository: TodoListRepository;

  const todoGetter = async () => todoRepository;
  const todoListGetter = async () => todoListRepository;

  todoRepository = new TodoRepository(datasource, todoListGetter);
  todoListRepository = new TodoListRepository(datasource, todoGetter);

  await todoRepository.deleteAll();
  await todoListRepository.deleteAll();
>>>>>>> 367acd9... feat: create database helper
=======
>>>>>>> 99c96a2... refactor: refactor helpers and db.datasource
};
