module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :items, [ItemType], null: false
    def items
      Item.all
    end
  end
end
