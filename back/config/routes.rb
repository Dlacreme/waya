Rails.application.routes.draw do

  get 'user(/:id)', to: "session#index"
  post 'signin', to: "session#signin"
  post 'login', to: "session#login"
  post 'login/:provider_id', to: "session#provider"

  # Stocks
  resources :stock
  resources :stock_type
  resources :stock_unit

end
