const { introspectSchema, makeRemoteExecutableSchema, ApolloServer } = require('apollo-server');
const { createHttpLink } = require('apollo-link-http');
const fetch = require('cross-fetch');

const CALENDAR_APP_URI = 'http://calendar-app:3000/graphql'

const link = createHttpLink({
  uri: CALENDAR_APP_URI,
  fetch,
})

module.exports = async () => {
  const schema = await introspectSchema(link);
  return makeRemoteExecutableSchema({
    schema,
    link
  });
}
