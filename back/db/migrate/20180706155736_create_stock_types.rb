class CreateStockTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :stock_types do |t|
      t.string :name
      t.boolean :is_disabled, default: false

      t.timestamps
    end
  end
end
