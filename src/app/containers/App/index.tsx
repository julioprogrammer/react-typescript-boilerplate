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
  const todosReducer = useSelector((state : RootState) : TodoModel[] => (state.todos));

  React.useEffect(() => {
    fetch('/api/todos')
      .then(response => response.json())
      .then((json) => json.todos)
      .then((todos : TodoModel[]) => dispatch({ type: TodoActions.Type.REQUEST_TODO, payload: todos }))
  }, []);

  const handleClearCompleted = (): void => {
    const hasCompletedTodo = todosReducer.some((todo) => todo.completed || false);
    if (hasCompletedTodo) {
      dispatch({ type: TodoActions.Type.CLEAR_COMPLETED });
    }
  }

  const handleFilterChange = (handleFilter: TodoModel.Filter): void => {
    const nextFilter = FILTER_VALUES.find((value) => value === handleFilter) || TodoModel.Filter.SHOW_ALL;
    setFilter(nextFilter);
    history.push(`#${handleFilter}`);
  }

  const renderApp = () : JSX.Element => {
    const activeCount = todosReducer.length - todosReducer.filter((todo) => todo.completed).length;
    const filteredTodos = filter ? todosReducer.filter(FILTER_FUNCTIONS[filter]) : todosReducer;
    const completedCount = todosReducer.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);

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
