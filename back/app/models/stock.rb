class Stock < ApplicationRecord

  belongs_to :stock_format
  belongs_to :stock_type

  has_many :product_stock
  has_many :products, through: :product_stocks

end
