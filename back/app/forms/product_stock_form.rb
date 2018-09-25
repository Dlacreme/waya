class ProductStockForm < Reform::Form
  property :stock_id
  property :product_id
  property :quantity
  property :unit

  validates :stock_id, presence: true
  validates :product_id, presence: true
  validates :quantity, presence: true
end