class CreateProductPrices < ActiveRecord::Migration[5.1]
  def change
    create_table :product_prices do |t|
      t.integer :product_id
      t.integer :product_price_type_id, default: 1
      t.decimal :price
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
