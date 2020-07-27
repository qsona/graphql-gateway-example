class Item
  LIST = []

  def initialize(type, text, date)
    @type = type
    @text = text
    @date = date
  end

  attr_reader :type, :text, :date

  def self.create!(type, text, date)
    item = new(type, text, date)
    LIST << item
    item
  end

  def self.all
    todo_items + LIST
  end

  def self.todo_items
    client = Faraday.new('http://todo-app:3000/') do |conn|
      conn.request :json
      conn.response :json, content_type: /\bjson$/

      conn.adapter :net_http
    end

    query = <<~EOS
query {
  todos {
    text
    date
  }
}
    EOS

    response = client.post('graphql', { query: query })
    response.body['data']['todos'].map { |json| new('todo', json['text'], json['date']) }
  end
end
