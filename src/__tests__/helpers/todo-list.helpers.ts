import {juggler} from '@loopback/repository';
import {TodoList} from '../../models';
import {TodoListRepository, TodoRepository} from '../../repositories';

export function givenTodoListData(data?: Partial<TodoList>): Partial<TodoList> {
  return Object.assign(
    {
      title: "dummyList",
      color: "blue"
    },
    data
  );
}


export async function givenTodoList(datasource: juggler.DataSource, data?: Partial<TodoList>): Promise<Partial<TodoList>> {
  let todoRepository: TodoRepository;

  const newTodoList = await new TodoListRepository(datasource, async () => todoRepository).create(givenTodoListData(data));

  return newTodoList;
}
