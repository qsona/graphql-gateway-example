module Mutations
  class CreateItem < BaseMutation
    argument :text, String, required: true
    argument :date, String, required: true

    field :item, Types::ItemType, null: false

    def resolve(text:, date:)
      item = Item.create!('event', text, date)
      { item: item }
    end
  end
end

