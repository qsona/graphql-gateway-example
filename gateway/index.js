const { ApolloServer, gql } = require('apollo-server');
const schema = require('./schema');
const{ printError } = require('graphql');


// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
//
//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }
//
//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;
const loggingPlugin = {
  requestDidStart(requestContext) {
    if (requestContext.request.http) {
      const datetime = `${new Date().toISOString()}`
      const method = requestContext.request.http.method
      const url = requestContext.request.http.url
      console.info(`[${datetime}] Request started: ${method} ${url}`)
    }

    if (requestContext.request.query)
      console.info(requestContext.request.query.replace(/\n/g, '\\n'))
    if (requestContext.request.variables)
      console.info(
        `variables: ${JSON.stringify(requestContext.request.variables)}`
      )

    return {
      didEncounterErrors(requestContext) {
        const datetime = `${new Date().toISOString()}`
        requestContext.errors.forEach((error) => {
          console.error(`[${datetime}] Error ${printError(error)}`)
        })
      },
      willSendResponse(requestContext) {
        const datetime = `${new Date().toISOString()}`
        const statusCode = requestContext.response.http?.status
        console.info(`[${datetime}] Completed ${statusCode || ''}`)
      },
    }
  },
}

const run = async () => {

  const server = new ApolloServer({
    schema: await schema(),
    plugins: [loggingPlugin],
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  //const server = new ApolloServer({ schema });

  // The `listen` method launches a web server.
  server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

run();
