const { introspectSchema, makeRemoteExecutableSchema, ApolloServer } = require('apollo-server');
const { createHttpLink } = require('apollo-link-http');
const fetch = require('cross-fetch');

const TODO_APP_URI = 'http://todo-app:3000/graphql'

const link = createHttpLink({
  uri: TODO_APP_URI,
  fetch,
})

module.exports = async () => {
  const schema = await introspectSchema(link);
  return makeRemoteExecutableSchema({
    schema,
    link
  });
}
