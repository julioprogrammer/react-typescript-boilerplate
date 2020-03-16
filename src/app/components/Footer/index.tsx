import * as React from 'react';
import * as style from './style.scss';
import * as classNames from 'classnames';
import { TodoModel } from 'app/models';

export const FILTER_TITLES = {
  [TodoModel.Filter.SHOW_ALL]: 'All',
  [TodoModel.Filter.SHOW_ACTIVE]: 'Active',
  [TodoModel.Filter.SHOW_COMPLETED]: 'Completed'
};

export namespace Footer {
  export interface Props {
    filter: TodoModel.Filter;
    activeCount?: number;
    completedCount?: number;
    onClickFilter: (filter: TodoModel.Filter) => any;
    onClickClearCompleted: () => any;
  }
}

export function Footer(props : Footer.Props) {
  const renderTodoCount = (): JSX.Element => {
    const { activeCount } = props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style.default.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  const renderFilterLink = (filter: TodoModel.Filter): JSX.Element => {
    const { filter: selectedFilter, onClickFilter } = props;

    return (
      <a
        href={'#/'}
        className={classNames({ [style.default.selected]: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onClickFilter(filter)}
        children={FILTER_TITLES[filter]}
        role="button"
      />
    );
  }

  const renderClearButton = (): JSX.Element | void => {
    const { completedCount, onClickClearCompleted } = props;
    if (completedCount! > 0) {
      return (
        <button
          className={style.default.clearCompleted}
          onClick={onClickClearCompleted}
          children={'Clear completed'}
        />
      );
    }
  }

  return (
    <footer className={style.default.normal}>
      {renderTodoCount()}
      <ul className={style.default.filters}>
        {(Object.keys(TodoModel.Filter) as (keyof typeof TodoModel.Filter)[]).map((key) => (
          <li key={key} children={renderFilterLink(TodoModel.Filter[key])} />
        ))}
      </ul>
      {renderClearButton()}
    </footer>
  );
}
