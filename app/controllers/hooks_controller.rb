class HooksController < ApplicationController
  def new
    @hook = Hook.new
  end

  def create
    @hook = Hook.new(hook_params)
    @hook.tags = @hook.tags.first.split(',')

    if @hook.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def hook_params
    params.require(:hook).permit(:title, :body, tags: [])
  end
end
