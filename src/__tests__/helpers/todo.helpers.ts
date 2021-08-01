import {juggler} from '@loopback/repository';
import {Todo} from '../../models';
import {TodoListRepository, TodoRepository} from '../../repositories';

export function givenTodoData(data?: Partial<Todo>): Partial<Todo> {
  return Object.assign(
    {
      id: 60,
      title: "dummy",
      desc: "this is just a test todo",
      isComplete: false,
      todoListId: 99
    },
    data
  );
}


export async function givenTodo(datasource: juggler.DataSource, data?: Partial<Todo>): Promise<Partial<Todo>> {
  let todoRepository: TodoRepository;
  let todoListRepository: TodoListRepository;

  const todoGetter = async () => todoRepository;
  const todoListGetter = async () => todoListRepository;

  todoRepository = new TodoRepository(datasource, todoListGetter);
  todoListRepository = new TodoListRepository(datasource, todoGetter);

  const newTodo = await todoRepository.create(givenTodoData(data));

  return newTodo;
}
