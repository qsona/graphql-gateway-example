module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :todos, [TodoType], null: false
    def todos
      # mark_resilience #1
      sleep 2
      Todo.all
    end
  end
end
