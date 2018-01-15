Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :tags, only: [:index]
    resources :hooks, only: [:index, :show, :new, :create] do
      resources :votes, only: [:create]
    end
  end

  root 'home#index'
  get '*path', to: 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
