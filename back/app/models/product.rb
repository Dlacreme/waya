class Product < ApplicationRecord
  belongs_to :product_category
  has_many :product_prices

  has_many :order_products
  has_many :orders, through: :order_products

  has_many :product_stocks
  has_many :stocks, through: :product_stocks

  @standard_price
  @member_price

  attr_accessor :standard_price, :member_price

  def get_price(price_type)
    self.product_prices
      .where('product_price_type_id = ? AND (end_date IS null || end_date > NOW())', price_type)
      .order('id DESC')
      .first
  end

  def update_product_stocks(product_stocks)
    product_stocks_array = []
    product_stocks.each do |x|
      x[:product_id] = self.id
      existing_item = get_existing_product_stock(x)
      form = existing_item ? ProductStockForm.new(existing_item) : ProductStockForm.new(ProductStock.new)
      form.validate(x) && form.save
      product_stocks_array.push(form.id)
    end

    ProductStock
      .where(product_id: self.id)
      .where.not(:id => product_stocks_array)
      .delete_all
  end

  def update_prices(product_prices)
    product_prices.each do |x|
      self.update_price(x)
    end
  end

  def update_price(product_price)
    product_price[:start_date] = DateTime.now unless product_price.key?("start_date")
    ProductPrice
      .where("product_id = ? AND product_price_type_id = ? AND end_date IS NULL", self.id, product_price[:product_price_type_id])
      .update_all(end_date: product_price[:start_date])
    new_price = ProductPrice.new()
    new_price.product_id = self.id
    new_price.price = product_price[:price]
    new_price.product_price_type_id = product_price[:product_price_type_id] ? product_price[:product_price_type_id] : PriceTypeEnum::Standard
    new_price.start_date = product_price[:start_date]
    new_price.end_date = nil
    new_price.save
  end

private
  def get_existing_product_stock(item)
    return nil unless item.key?("id")
    ProductStock.find_by_id(item[:id])
  end

end
