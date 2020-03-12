import * as React from 'react';
import * as style from './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TodoActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { TodoModel } from 'app/models';
import { Header, TodoList, Footer } from 'app/components';

const FILTER_VALUES = (Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map(
  (key) => TodoModel.Filter[key]
);

const FILTER_FUNCTIONS: Record<TodoModel.Filter, (todo: TodoModel) => boolean> = {
  [TodoModel.Filter.SHOW_ALL]: () => true,
  [TodoModel.Filter.SHOW_ACTIVE]: (todo) => !todo.completed,
  [TodoModel.Filter.SHOW_COMPLETED]: (todo) => todo.completed
};

export function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filter, setFilter] = React.useState(TodoModel.Filter.SHOW_ALL);
  const todos = useSelector((state : RootState) : TodoModel[] => (state.todos));

  const handleClearCompleted = (): void => {
    const hasCompletedTodo = todos.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      dispatch({ type: TodoActions.Type.CLEAR_COMPLETED });
    }
  }

  const handleFilterChange = (filter: TodoModel.Filter): void => {
    const nextFilter = FILTER_VALUES.find((value) => value === filter) || TodoModel.Filter.SHOW_ALL;
    setFilter(nextFilter);
    history.push(`#${filter}`);
  }

  const renderApp = () : JSX.Element => {
    const activeCount = todos.length - todos.filter((todo) => todo.completed).length;
    const filteredTodos = filter ? todos.filter(FILTER_FUNCTIONS[filter]) : todos;
    const completedCount = todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

    return (
      <div className={style.normal}>
        <Header />
        <TodoList todos={filteredTodos} />
        <Footer
          filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClickClearCompleted={handleClearCompleted}
          onClickFilter={handleFilterChange}
        />
      </div>
    );
  }

  return renderApp();
}
