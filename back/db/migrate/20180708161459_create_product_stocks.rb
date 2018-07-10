class CreateProductStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :product_stocks do |t|
      t.integer :product_id
      t.integer :stock_id
      t.decimal :quantity

      t.timestamps
    end
  end
end
