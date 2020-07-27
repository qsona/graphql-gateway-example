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
    # mark_resilience #2
    # client = Faraday.new('http://todo-app:3000/') do |conn|
    client = Faraday.new('http://calendar-app-envoy:10000/todo-app') do |conn|
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

    unless response.success?
      # mark_resilience #4
      # raise "Error: #{response.status} #{response.body}"
      puts "Error: #{response.status} #{response.body}"
      return []
    end

    response.body['data']['todos'].map { |json| new('todo', json['text'], json['date']) }
  end
end
