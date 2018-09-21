class Order < ApplicationRecord

  belongs_to :table, optional: true
  belongs_to :customer, class_name: "User", foreign_key: "customer_id", optional: true
  belongs_to :invoice, class_name: "Document", foreign_key: "invoice_id", optional: true
  belongs_to :order_status
  belongs_to :payment_method, optional: true
  has_many :order_action_histories
  has_many :voucher_consumptions

  has_many :order_products
  has_many :products, through: :order_products

  def create_action(user, comment = nil)
    self.save_action(user.id, OrderActionEnum::Create, set_comment(user, comment ? comment : "created the order"))
  end

  def set_status(user, status_id, comment)
    self.order_status_id = status_id
    self.save
    self.save_action(user.id, OrderActionEnum::Update, set_comment(user, comment ? comment : "update the status #{status_id}"))
  end

  def set_table(user, table_id, comment)
    self.table_id = table_id > 0 ? table_id : nil
    self.save
    self.save_action(user.id, OrderActionEnum::Update, set_comment(user, comment ? comment : "update the table #{table_id}"))
  end

  def set_customer(user, user_id, comment)
    self.customer_id = user_id > 0 ? user_id : nil
    self.save
    self.save_action(user.id, OrderActionEnum::Update, set_comment(user, comment ? comment : "update the customer #{user_id}"))
  end

  def add_products(ids = nil)
    return unless ids
    OrderProduct.transaction do
      ids.each do |x|
        op = OrderProduct.new
        op.order_id = self.id
        op.product_id = x
        op.save
      end
    end
    calc_price
  end

  def remove_products(ids = nil)
    return unless ids && ids.length > 0
    ids.each do |id|
      OrderProduct.where(order_id: self.id, product_id: id).first.delete
    end
    calc_price
  end

  def cancel(user, comment = nil)
    self.order_status_id = OrderStatusEnum::Cancelled
    self.save
    self.save_action(user.id, OrderActionEnum::Cancel, set_comment(user, comment ? comment : "cancelled the order"))
  end

  def payment(user, payment_method_id)
    self.payment_method_id = payment_method_id
    self.paid_at = DateTime.now
    self.amount_paid = self.total_price
    # self.order_status_id = OrderStatusEnum::Paid # `Paid` status should not be a thing... My bad.
    self.invoice_id = (Document.push("Order ##{self.id}", 'text/html', self.generateInvoice())).id
    self.save
    self.save_action(user.id, OrderActionEnum::Paid, set_comment(user, "made payment"))
  end

  def add_voucher(user, voucher_id)
    oc = VoucherConsumption.new
    oc.order_id = self.id
    oc.voucher_id = voucher_id
    oc.created_by_id = user.id
    oc.save!
    calc_price
    self.save_action(user.id, OrderActionEnum::Update, set_comment(user, "add voucher"))
  end

  def remove_voucher(user, voucher_id)
    VoucherConsumption.where(voucher_id: voucher_id).where(order_id: self.id).delete_all
    calc_price
    self.save_action(user.id, OrderActionEnum::Update, set_comment(user, "remove voucher"))
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
    "#{user.username} (##{user.id}): #{comment}"
  end

  def calc_price()
    ActiveRecord::Base.connection.execute("CALL calcul_price(#{self.id})")
  end

  def self.calc_price(order_id)
    ActiveRecord::Base.connection.execute("CALL calcul_price(#{order_id})")
  end

  def generateInvoice
    ActionView::Base.new('app/views').render(file: 'orders/invoice', locals: {order: self})
  end

end
