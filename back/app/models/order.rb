class Order < ApplicationRecord

  belongs_to :table, optional: true
  belongs_to :customer, class_name: "User", foreign_key: "customer_id", optional: true
  belongs_to :order_status
  belongs_to :payment_method, optional: true
  has_many :order_action_histories

  def create_action(user, comment = nil)
    self.save_action(user.id, OrderActionEnum::Create, set_comment(user, comment ? comment : "created the order"))
  end

  def set_table(user, table_id, comment)
    self.table_id = table_id
    self.save
    self.save_action(user.id, OrderActionEnum::Update, set_comment(user, comment ? comment : "update the table #{table_id}"))
  end

  def set_customer(user, user_id, comment)
    self.customer_id = user_id
    self.save
    self.save_action(user.id, OrderActionEnum::Update, set_comment(user, comment ? comment : "update the customer #{user_id}"))  
  end

  def set_products
  end  

  def cancel(user, comment = nil)
    self.order_status_id = OrderStatusEnum::Cancelled
    self.save
    self.save_action(user.id, OrderActionEnum::Cancel, set_comment(user, comment ? comment : "cancelled the order"))
  end

  def save_action(user_id, action_id, comment = nil)
    action = OrderActionHistory.new
    action.order_id = self.id
    action.user_id = user_id
    action.order_action_id = action_id
    action.comment = comment;
    action.save!
  end

  def set_comment(user, comment)
    "#{user.id} (#{user.username}): #{comment}"
  end

end
