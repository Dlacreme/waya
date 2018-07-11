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
  # Products
  resources :product, only: [:index, :show, :create, :update, :destroy]
  resources :product_category, only: [:index, :show, :create, :update, :destroy]
  # Orders
  resources :order, only: [:index, :show, :create]
  post 'order/:id/delete', to: "order#destroy"
  post 'order/:id/table', to: "order#table"
  post 'order/:id/customer', to: "order#customer"
  post 'order/:id/products', to: "order#products"
  post 'order/:id/payment', to: "order#payment"
  post 'order/:id/voucher/:voucher_id', to: 'order#add_voucher'
  delete 'order/:id/voucher/:voucher_id', to: 'order#remove_voucher'
  # Vouchers
  resources :voucher, only: [:index, :show, :create, :destroy]

end
