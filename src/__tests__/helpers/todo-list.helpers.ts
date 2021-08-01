import {juggler} from '@loopback/repository';
import {TodoList} from '../../models';
import {TodoListRepository, TodoRepository} from '../../repositories';

export function givenTodoListData(data?: Partial<TodoList>): Partial<TodoList> {
  return Object.assign(
    {
<<<<<<< HEAD
<<<<<<< HEAD
=======
      id: 99,
>>>>>>> 2fd61bf... feat: create todolist helpers
=======
>>>>>>> 99c96a2... refactor: refactor helpers and db.datasource
      title: "dummyList",
      color: "blue"
    },
    data
  );
}


export async function givenTodoList(datasource: juggler.DataSource, data?: Partial<TodoList>): Promise<Partial<TodoList>> {
  let todoRepository: TodoRepository;
<<<<<<< HEAD
<<<<<<< HEAD

  const todoListRepository = new TodoListRepository(datasource, async () => todoRepository);
=======
  let todoListRepository: TodoListRepository;

  const todoGetter = async () => todoRepository;
  const todoListGetter = async () => todoListRepository;

  todoRepository = new TodoRepository(datasource, todoListGetter);
  todoListRepository = new TodoListRepository(datasource, todoGetter);

>>>>>>> 2fd61bf... feat: create todolist helpers
  const newTodoList = await todoListRepository.create(givenTodoListData(data));
=======

  const newTodoList = await new TodoListRepository(datasource, async () => todoRepository).create(givenTodoListData(data));
>>>>>>> 99c96a2... refactor: refactor helpers and db.datasource

  return newTodoList;
}
