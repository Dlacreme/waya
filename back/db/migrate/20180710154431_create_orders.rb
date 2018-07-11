class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.integer :table_id
      t.integer :customer_id
      t.integer :order_status_id
      t.datetime :paid_at
      t.decimal :total_price
      t.decimal :amount_paid
      t.integer :payment_method_id
      t.integer :invoice_id

      t.timestamps
    end
  end
end
