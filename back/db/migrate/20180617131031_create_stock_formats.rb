class CreateStockFormats < ActiveRecord::Migration[5.1]
  def change
    create_table :stock_formats do |t|
      t.string :name
      t.integer :stock_unit_id

      t.timestamps
    end
  end
end
