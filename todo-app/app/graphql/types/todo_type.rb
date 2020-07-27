module Types
  class TodoType < BaseObject
    field :date, String, null: false
    field :text, String, null: false
  end
end
