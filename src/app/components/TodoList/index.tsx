import * as React from 'react';
import * as style from './style.css';
import { useDispatch } from 'react-redux';
import { TodoActions } from 'app/actions/todos';
import { TodoItem } from '../TodoItem';
import { TodoModel } from 'app/models/TodoModel';

export namespace TodoList {
  export interface Props {
    todos: TodoModel[];
  }
}

export function TodoList(props: TodoList.Props) {
  const dispatch = useDispatch();

  const renderToggleAll = () : JSX.Element | void => {
    const { todos } = props;
    if (todos.length > 0) {
      const hasIncompleted = todos.some((todo) => !todo.completed);
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={hasIncompleted}
          onChange={() => dispatch({ type: TodoActions.Type.COMPLETE_ALL })}
        />
      );
    }
  }

  return (
    <section className={style.main}>
      {renderToggleAll()}
      <ul className={style.normal}>
        {props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
}
