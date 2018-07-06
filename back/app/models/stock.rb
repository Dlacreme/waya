class Stock < ApplicationRecord

  belongs_to :stock_unit
  belongs_to :stock_type

end
