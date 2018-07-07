Rails.application.routes.draw do

  get 'user(/:id)', to: "session#index"
  post 'signin', to: "session#signin"
  post 'login', to: "session#login"
  post 'login/:provider_id', to: "session#provider"

  # Stocks
  resources :stock, only: [:index, :show, :create, :update, :destroy]
  resources :stock_type, only: [:index, :show, :create, :update, :destroy]
  resources :stock_unit, only: [:index, :show, :create, :update, :destroy]
  resources :stock_format, only: [:index, :show, :create, :update, :destroy]

end
