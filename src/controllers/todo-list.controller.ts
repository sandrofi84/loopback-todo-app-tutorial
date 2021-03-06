import {authenticate} from '@loopback/authentication';
import {User} from '@loopback/authentication-jwt';
import {inject, intercept} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {SecurityBindings} from '@loopback/security';
import {ValidateTodoListItemInterceptor} from '../interceptors';
import {TodoList} from '../models';
import {TodoListRepository} from '../repositories';

@authenticate('jwt')
@intercept(ValidateTodoListItemInterceptor.BINDING_KEY)
export class TodoListController {
  constructor(
    @repository(TodoListRepository)
    public todoListRepository : TodoListRepository,
  ) {}

  @post('/todo-lists')
  @response(200, {
    description: 'TodoList model instance',
    content: {'application/json': {schema: getModelSchemaRef(TodoList)}},
  })
  async create(
    @inject(SecurityBindings.USER)
    user: User,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoList, {
            title: 'NewTodoList',
            exclude: ['id', 'userId'],
          }),
        },
      },
    })
    todoList: Omit<TodoList, 'id'>,
  ): Promise<TodoList> {
    return this.todoListRepository.create({...todoList, userId: user.id});
  }

  @get('/todo-lists/count')
  @response(200, {
    description: 'TodoList model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TodoList) where?: Where<TodoList>,
  ): Promise<Count> {
    return this.todoListRepository.count(where);
  }

  @get('/todo-lists')
  @response(200, {
    description: 'Array of TodoList model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TodoList, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TodoList) filter?: Filter<TodoList>,
  ): Promise<TodoList[]> {
    return this.todoListRepository.find(filter);
  }

  @patch('/todo-lists')
  @response(200, {
    description: 'TodoList PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoList, {partial: true}),
        },
      },
    })
    todoList: TodoList,
    @param.where(TodoList) where?: Where<TodoList>,
  ): Promise<Count> {
    return this.todoListRepository.updateAll(todoList, where);
  }

  @get('/todo-lists/{id}')
  @response(200, {
    description: 'TodoList model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TodoList, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TodoList, {exclude: 'where'}) filter?: FilterExcludingWhere<TodoList>
  ): Promise<TodoList> {
    return this.todoListRepository.findById(id, filter);
  }

  @patch('/todo-lists/{id}')
  @response(204, {
    description: 'TodoList PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoList, {partial: true}),
        },
      },
    })
    todoList: TodoList,
  ): Promise<void> {
    await this.todoListRepository.updateById(id, todoList);
  }

  @put('/todo-lists/{id}')
  @response(204, {
    description: 'TodoList PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() todoList: TodoList,
  ): Promise<void> {
    await this.todoListRepository.replaceById(id, todoList);
  }

  @del('/todo-lists/{id}')
  @response(204, {
    description: 'TodoList DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.todoListRepository.deleteById(id);
  }
}
