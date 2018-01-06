class HomeController < ApplicationController
  def index
    @hooks = Hook.all
  end
end
