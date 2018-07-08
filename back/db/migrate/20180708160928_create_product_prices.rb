class CreateProductPrices < ActiveRecord::Migration[5.1]
  def change
    create_table :product_prices do |t|
      t.string :product_id
      t.decimal :price
      t.decimal :member_price
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
