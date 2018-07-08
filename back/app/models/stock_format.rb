class StockFormat < ApplicationRecord
  belongs_to :stock_unit
  has_many :stocks
end
