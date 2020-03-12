import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';

export namespace TodoTextInput {
  export interface Props {
    text?: string;
    placeholder?: string;
    newTodo?: boolean;
    editing?: boolean;
    onSave: (text: string) => void;
  }

  export interface State {
    text: string;
  }
}

export function TodoTextInput(props: TodoTextInput.Props) {
  const [text, setText] = React.useState('');

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const textTarget = event.currentTarget.value.trim();
    if (event.which === 13) {
      props.onSave(textTarget);
      if (props.newTodo) {
        setText('');
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const text = event.target.value.trim();
    if (!props.newTodo) {
      props.onSave(text);
    }
  };

  const renderComponent = () : JSX.Element => {
    const classes = classNames(
      {
        [style.edit]: props.editing,
        [style.new]: props.newTodo
      },
      style.normal
    );

    return (
      <input
        className={classes}
        type="text"
        autoFocus
        placeholder={props.placeholder}
        value={text}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
    );
  };

  return renderComponent();
}
