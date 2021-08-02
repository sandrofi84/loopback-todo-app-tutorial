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

<<<<<<< HEAD
  const todoListRepository = new TodoListRepository(datasource, async () => todoRepository);
  const newTodoList = await todoListRepository.create(givenTodoListData(data));
=======
  const newTodoList = await new TodoListRepository(datasource, async () => todoRepository).create(givenTodoListData(data));
>>>>>>> aca9f908b8d42394c6ca4f5a40d5335cc6a49bde

  return newTodoList;
}
