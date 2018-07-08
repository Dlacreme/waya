class CreateStockFormats < ActiveRecord::Migration[5.1]
  def change
    create_table :stock_formats do |t|
      t.string :name
      t.integer :stock_unit_id
      t.boolean :is_disabled, default: false

      t.timestamps
    end
  end
end
