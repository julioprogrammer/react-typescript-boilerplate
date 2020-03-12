import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'enzyme';
import configureStore from 'redux-mock-store';
import { TodoModel } from 'app/models';
import { TodoItem } from '../index';

const todoMock : TodoModel = {
  id: 1,
  text: 'Teste component render',
  completed: false
};

const mockStore = configureStore();

const store = mockStore(todoMock);

describe('TodoItem', () => {
  describe('Render', () => {
    it('should match snapshot', () => {
      const rendered =  render(
        <Provider store={store}>
          <TodoItem todo={todoMock} />
        </Provider>
      );
      expect(rendered).toMatchSnapshot();
    })
  });
});
