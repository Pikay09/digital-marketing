import { createServer, JSONAPISerializer } from 'miragejs';

import data from './data.json';

createServer({
  serializers: {
    application: JSONAPISerializer,
  },

  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    },
    {timing:1000});


    //this route fetches one
    this.get('/posts/:id', (schema, request) => {
      let id = request.params.id
    
      return data.posts.find(obj=>obj.id === id)
    },
    {timing:1000});
  },
});
