class Order < ApplicationRecord

  belongs_to :table
  belongs_to :customer, class_name: "User", foreign_key: "customer_id", optional: true  
  belongs_to :order_status  
  belongs_to :payment_method
end
