class Product < ApplicationRecord
  belongs_to :product_category
  has_many :product_prices

  has_many :product_stocks
  has_many :stocks, through: :product_stocks

  def update_product_stocks(product_stocks)
    p "UPDATE PRODUCT STOCKS"
    p product_stocks  
  end

  def update_price(product_price)
    product_price[:start_date] = DateTime.now unless product_price.key?("start_date")
    ProductPrice.where("product_id = ? AND end_date IS NULL", self.id).update_all(end_date: product_price[:start_date])
    new_price = ProductPrice.new()
    new_price.product_id = self.id
    new_price.price = product_price[:price]
    new_price.member_price = product_price[:member_price]
    new_price.start_date = product_price[:start_date]
    new_price.end_date = nil
    new_price.save
  end

end
