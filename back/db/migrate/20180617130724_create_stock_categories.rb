class CreateStockCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :stock_categories do |t|
      t.string :name
      t.boolean :is_disabled

      t.timestamps
    end
  end
end
