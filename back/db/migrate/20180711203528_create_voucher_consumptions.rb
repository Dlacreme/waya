class CreateVoucherConsumptions < ActiveRecord::Migration[5.1]
  def change
    create_table :voucher_consumptions do |t|
      t.integer :voucher_id
      t.integer :order_id
      t.integer :created_by_id

      t.timestamps
    end
  end
end
