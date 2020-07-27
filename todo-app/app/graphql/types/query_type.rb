module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :todos, [TodoType], null: false
    def todos
      Todo.all
    end
  end
end
