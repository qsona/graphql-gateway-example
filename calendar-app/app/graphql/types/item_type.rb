module Types
  class ItemType < BaseObject
    field :type, String, null: false
    field :date, String, null: false
    field :text, String, null: false
  end
end
