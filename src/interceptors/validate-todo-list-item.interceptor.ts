import {
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise
} from '@loopback/core';
import {Color, ColorStrings} from '../enums/todo-list-enums';
import {TodoList} from '../models';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({tags: {key: ValidateTodoListItemInterceptor.BINDING_KEY}})
export class ValidateTodoListItemInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ValidateTodoListItemInterceptor.name}`;

  /*
  constructor() {}
  */

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {

    let todoList: TodoList | undefined;

    if (invocationCtx.methodName === "create") {
      // in case the user is posting a TodoList
      todoList = invocationCtx.args[0];
    } else if (invocationCtx.methodName === "replaceById") {
      // in case the user is replacing a TodoList
      todoList = invocationCtx.args[1];
    }

    if (todoList && !this.validateColor(todoList.color)) {
      // if we are hitting the POST /todo-list or the PUT /todo-list/{id}
      // endpoint and the color property is not valid
      const err = new ValidationError("Invalid color value");

      err.statusCode = 400;

      throw err;
    }

      // We invoke the Controller's method
      const result = await next();

      return result;
  }


  validateColor(color: string): boolean {
    const possibleColors: Array<string> = [];

    for (const key in Color) {
      possibleColors.push(Color[key as ColorStrings]);
    }

    return possibleColors.includes(color);
  }
}

class ValidationError extends Error {
  statusCode?: number;
};
