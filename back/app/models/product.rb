class Product < ApplicationRecord
  belongs_to :product_category
  has_many :product_prices

  has_many :product_stocks
  has_many :stocks, through: :product_stocks
end
