class HooksController < ApplicationController
  def new
    @popular_tags = Redis.current.zrevrange('popular_tags', 0, 10)
    @hook = Hook.new
  end

  def create
    @hook = Hook.new(hook_params)
    @hook.tags = @hook.tags.first.downcase.split(',')

    if @hook.save
      Redis.current.zadd('popular_tags', @hook.tags.map { |t| [1, t] }.flatten!)
      redirect_to root_path
    else
      @popular_tags = Redis.current.zrevrange('popular_tags', 0, 10)
      render 'new'
    end
  end

  private

  def hook_params
    params.require(:hook).permit(:title, :body, tags: [])
  end
end
