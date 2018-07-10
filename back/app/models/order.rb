class Order < ApplicationRecord

  belongs_to :table, optional: true
  belongs_to :customer, class_name: "User", foreign_key: "customer_id", optional: true
  belongs_to :order_status
  belongs_to :payment_method, optional: true
  has_many :order_action_histories

  def action_create(user_id)
    action = OrderActionHistory.new
    action.order_id = self.id
    action.user_id = user_id
    action.order_action_id = OrderActionEnum::Create
    action.comment = "";
    p action
    action.save
    p action.errors
  end

end
