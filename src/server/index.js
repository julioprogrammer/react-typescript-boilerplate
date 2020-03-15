import { Server, Model, Factory, RestSerializer } from 'miragejs';

export default new Server({
  environment: 'development',

  models: {
    todo: Model
  },

  factories: {
    todo: Factory.extend({
      id(i) {
        return i;
      },

      text(i) {
        return `My todo ${i}`;
      },

      completed() {
        return false;
      }
    })
  },

  serializers: {
    application: RestSerializer
  },

  seeds(server) {
    // server.create('todo');
    // server.create('todo');
    // server.create('todo', { id: 3, text: 'My todo list 3', completed: false });
    server.createList('todo', 10);
  },

  routes() {
    this.namespace = 'api';

    // Responding to a POST request
    this.post('/todo', (schema, request) => {
      const attrs = this.serialize(request.requestBody);

      return schema.todos.create(attrs);
    });

    // Responding to a GET request
    this.get('/todos', (schema, request) => {
      return schema.todos.all();
    });

    // Responding to a GET with ID request
    this.get('/todos/:id', (schema, request) => {
      const id = request.params.id;

      return schema.todos.find(id);
    });

    // Responding to a PATCH request
    this.patch('/todo/:id', (schema, request) => {
      const newAttrs = JSON.parse(request.requestBody);
      const id = request.id;
      const todo = schema.todos.find(id);

      return todo.update(newAttrs);
    });

    // Responding to a DELETE request
    this.delete('/todo/:id', (schema, request) => {
      const id = request.params.id;

      return schema.todos.find(id).destroy();
    });
  }
});
