class Api::TagsController < ApplicationController
  def index
    tags = Redis.current.zrevrange('popular_tags', 0, 10)
    render json: { popular_tags: tags }
  end
end
