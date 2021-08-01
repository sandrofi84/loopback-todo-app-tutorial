import {juggler} from '@loopback/repository';
import {TodoListRepository, TodoRepository} from '../../repositories';

export async function givenEmptyDB(datasource: juggler.DataSource) {
  let todoRepository: TodoRepository;
  let todoListRepository: TodoListRepository;

  await new TodoRepository(datasource, async () => todoListRepository).deleteAll();
  await new TodoListRepository(datasource, async () => todoRepository).deleteAll();
};
