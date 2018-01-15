class Api::HooksController < ApplicationController
  def index
    render json: Hook.all
  end

  def create
    @hook = Hook.new(hook_params)
    @hook.tags = @hook.tags.map(&:downcase)

    if @hook.save
      @hook.tags.each do |tag|
        Redis.current.zincrby('popular_tags', 1, tag)  
      end
      render json: { redirect: true }, status: 200
    else
      render json: { errors: @hook.errors }, status: 422
    end
  end

  private

  def hook_params
    params.require(:hook).permit(:title, :body, tags: [])
  end
end
