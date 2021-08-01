import {juggler} from '@loopback/repository';
import {TodoList} from '../../models';
import {TodoListRepository, TodoRepository} from '../../repositories';

export function givenTodoListData(data?: Partial<TodoList>): Partial<TodoList> {
  return Object.assign(
    {
      id: 99,
      title: "dummyList",
      color: "blue"
    },
    data
  );
}


export async function givenTodoList(datasource: juggler.DataSource, data?: Partial<TodoList>): Promise<Partial<TodoList>> {
  let todoRepository: TodoRepository;
  let todoListRepository: TodoListRepository;

  const todoGetter = async () => todoRepository;
  const todoListGetter = async () => todoListRepository;

  todoRepository = new TodoRepository(datasource, todoListGetter);
  todoListRepository = new TodoListRepository(datasource, todoGetter);

  const newTodoList = await todoListRepository.create(givenTodoListData(data));

  return newTodoList;
}
