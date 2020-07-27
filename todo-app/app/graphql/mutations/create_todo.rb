module Mutations
  class CreateTodo < BaseMutation
    argument :text, String, required: true
    argument :date, String, required: true

    field :todo, Types::TodoType, null: false

    def resolve(text:, date:)
      todo = Todo.create!(text, date)
      { todo: todo }
    end
  end
end

