import {juggler} from '@loopback/repository';
import {Todo} from '../../models';
import {TodoListRepository, TodoRepository} from '../../repositories';

export function givenTodoData(data?: Partial<Todo>): Partial<Todo> {
  return Object.assign(
    {
      title: "dummy",
      desc: "this is just a test todo",
      isComplete: false,
      todoListId: "1"
    },
    data
  );
}


export async function givenTodo(datasource: juggler.DataSource, data?: Partial<Todo>): Promise<Partial<Todo>> {
  let todoListRepository: TodoListRepository;

  const todoRepository = new TodoRepository(datasource, async () => todoListRepository);
  const newTodo = await todoRepository.create(givenTodoData(data));

  return newTodo;
}
