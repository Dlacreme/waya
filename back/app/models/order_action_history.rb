class OrderActionHistory < ApplicationRecord
  belongs_to :user
  belongs_to :order
  belongs_to :order_action
end
