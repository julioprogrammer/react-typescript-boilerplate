import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { useDispatch } from 'react-redux';
import { TodoModel } from 'app/models';
import { TodoActions } from 'app/actions';
import { TodoTextInput } from '../TodoTextInput';

export namespace TodoItem {
  export interface Props {
    todo: TodoModel;
  }

  export interface State {
    editing: boolean;
  }
}

export function TodoItem(props: TodoItem.Props) {
  const [editing, setEditing] = React.useState(false);
  const dispatch = useDispatch();

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      dispatch({ type: TodoActions.Type.DELETE_TODO, payload: id });
    } else {
      dispatch({ type: TodoActions.Type.EDIT_TODO, payload: { id, text } });
    }
    setEditing(false);
  };

  const completeTodo = (id: number) => {
    dispatch({ type: TodoActions.Type.COMPLETE_TODO, payload: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: TodoActions.Type.DELETE_TODO, payload: id });
  };

  const renderFunction = () : JSX.Element => {
    const { todo } = props;

    let element : JSX.Element;
    if (editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={(text) => todo.id && handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type="checkbox"
            checked={todo.completed}
            onChange={() => todo.id && completeTodo(todo.id)}
          />
          <label onDoubleClick={() => handleDoubleClick()}>{todo.text}</label>
          <button
            className={style.destroy}
            onClick={() => {
              if (todo.id) deleteTodo(todo.id);
            }}
          />
        </div>
      );
    }

    // TODO: compose
    const classes : string = classNames({
      [style.completed]: todo.completed,
      [style.editing]: editing,
      [style.normal]: editing
    });

    return <li className={classes}>{element}</li>;
  }

  return renderFunction();
}
