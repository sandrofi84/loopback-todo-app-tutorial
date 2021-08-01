import {juggler} from '@loopback/repository';
import {TodoListRepository, TodoRepository} from '../../repositories';

export default async function givenEmptyDB(datasource: juggler.DataSource) {
  let todoRepository: TodoRepository;
  let todoListRepository: TodoListRepository;

  const todoGetter = async () => todoRepository;
  const todoListGetter = async () => todoListRepository;

  todoRepository = new TodoRepository(datasource, todoListGetter);
  todoListRepository = new TodoListRepository(datasource, todoGetter);

  await todoRepository.deleteAll();
  await todoListRepository.deleteAll();
};
