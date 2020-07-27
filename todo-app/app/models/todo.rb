class Todo
  LIST = []

  def initialize(text, date)
    @text = text
    @date = date
  end

  attr_reader :text, :date

  def self.create!(text, date)
    todo = new(text, date)
    LIST << todo
    todo
  end

  def self.all
    LIST
  end
end
