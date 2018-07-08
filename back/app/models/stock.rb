class Stock < ApplicationRecord

  belongs_to :stock_format
  belongs_to :stock_type

end
