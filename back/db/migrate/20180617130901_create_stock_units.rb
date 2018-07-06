class CreateStockUnits < ActiveRecord::Migration[5.1]
  def change
    create_table :stock_units do |t|
      t.string :name
      t.boolean :is_disabled, default: false

      t.timestamps
    end
  end
end
