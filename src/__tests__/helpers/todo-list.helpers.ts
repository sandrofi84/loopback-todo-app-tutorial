import {juggler} from '@loopback/repository';
import {TodoList} from '../../models';
import {TodoListRepository, TodoRepository} from '../../repositories';

export function givenTodoListData(data?: Partial<TodoList>): Partial<TodoList> {
  return Object.assign(
    {
      title: "dummyList",
      color: "red"
    },
    data
  );
}


export async function givenTodoList(datasource: juggler.DataSource, data?: Partial<TodoList>): Promise<Partial<TodoList>> {
  let todoRepository: TodoRepository;

  const todoListRepository = new TodoListRepository(datasource, async () => todoRepository);
  const newTodoList = await todoListRepository.create(givenTodoListData(data));

  return newTodoList;
}
