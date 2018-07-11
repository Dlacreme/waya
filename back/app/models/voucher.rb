class Voucher < ApplicationRecord
  belongs_to :voucher_type
  
  has_many :voucher_consumption
  has_many :orders, through: :voucher_consumption

end
