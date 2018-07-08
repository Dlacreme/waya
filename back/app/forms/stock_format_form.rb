class StockFormatForm < Reform::Form
  property :name
  property :stock_unit_id

  validates :name, presence: true
  validates :stock_unit_id, presence: true
end