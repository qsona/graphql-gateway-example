const makeExecutableTodoAppSchema = require('./todo_app_schema');
const makeExecutableCalendarAppSchema = require('./calendar_app_schema');
const { delegateToSchema, mergeSchemas } = require('graphql-tools');

module.exports = async () => {
  const todoAppSchema = await makeExecutableTodoAppSchema();
  const calendarAppSchema = await makeExecutableCalendarAppSchema();
  return mergeSchemas({
    schemas: [
      todoAppSchema,
      calendarAppSchema,
    ],
    resolvers: {
      Query: {
        todos: {
          resolve(payload, args, context, info) {
            return delegateToSchema({
              schema: todoAppSchema,
              operation: 'query',
              fieldName: 'todos',
              args,
              context,
              info,
            })
          },
        },
        items: {
          resolve(payload, args, context, info) {
            return delegateToSchema({
              schema: calendarAppSchema,
              operation: 'query',
              fieldName: 'items',
              args,
              context,
              info,
            })
          },
        },
      }
    }
  });
}

