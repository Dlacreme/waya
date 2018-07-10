class OrderActionHistory < ApplicationRecord
  belongs_to :users
  belongs_to :order_actions
end
