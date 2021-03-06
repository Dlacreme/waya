class CreateStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :stocks do |t|
      t.string :name
      t.string :desc
      t.integer :size
      t.integer :stock_format_id
      t.integer :stock_type_id
      t.boolean :is_disabled, default: false
      t.integer :balance

      t.timestamps
    end
  end
end
