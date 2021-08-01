import {juggler} from '@loopback/repository';
import {Todo} from '../../models';
import {TodoListRepository, TodoRepository} from '../../repositories';

function givenTodoData(data?: Partial<Todo>): Partial<Todo> {
  return Object.assign(
    {
      id: 60,
      name: "dummy"
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
