class VoucherConsumption < ApplicationRecord
  belongs_to :order
  belongs_to :voucher
  belongs_to :created_by, class_name: "User", foreign_key: "created_by_id"
end
