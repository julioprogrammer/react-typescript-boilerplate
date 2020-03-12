import * as React from 'react';
import { useDispatch } from 'react-redux';
import { TodoTextInput } from '../TodoTextInput';
import { TodoActions } from 'app/actions/todos';

export function Header() {
  const dispatch = useDispatch();

  const handleSave = (text: string) => {
    if (text.length) {
      dispatch({ type: TodoActions.Type.ADD_TODO, payload: { text } });
    }
  }

  return (
    <header>
      <h1>Todos</h1>
      <TodoTextInput newTodo onSave={handleSave} placeholder="What needs to be done?" />
    </header>
  );
}
