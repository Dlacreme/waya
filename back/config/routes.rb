Rails.application.routes.draw do

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
  resources :table, only: [:index, :show, :create, :update, :destroy]
  get 'order/search/:from/:to', to: 'order#search'
  get 'order/search/:from/:to/:status_ids', to: 'order#search'
  post 'order/:id/delete', to: "order#destroy"
  post 'order/:id/status', to: "order#status"
  post 'order/:id/table', to: "order#table"
  post 'order/:id/customer', to: "order#customer"
  post 'order/:id/products', to: "order#products"
  post 'order/:id/payment', to: "order#payment"
  post 'order/:id/voucher/:voucher_id', to: 'order#add_voucher'
  delete 'order/:id/voucher/:voucher_id', to: 'order#remove_voucher'
  # Vouchers
  resources :voucher, only: [:index, :show, :create, :destroy]
  # Users
  resources :user, only: [:index, :show, :create, :update, :destroy]
  get 'user/search/:query', to: 'user#search'
  get 'user/search_by_role/:role_id', to: 'user#search_by_role'
  put 'user/role/:id', to: 'user#update_role'
  # Articles
  resources :article, only: [:index, :show, :create, :update, :destroy]
  resources :event, only: [:index, :show, :create, :update, :destroy]
  # Upload
  post 'upload/product/:id', to: "product#picture"
  post 'upload/article/:id', to: "article#picture"
  post 'upload/user/:id', to: "user#picture"

end
