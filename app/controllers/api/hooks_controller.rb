class Api::HooksController < ApplicationController
  def index
    hooks = Hook.all.page(params[:page])
    render json: {hooks: hooks, pagination: {next_page: hooks.next_page, total_pages: hooks.total_pages, is_last_page: hooks.last_page?}}
  end

  def show
    hook = Hook.find_by(slug_id: params[:id])
    render json: hook
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
