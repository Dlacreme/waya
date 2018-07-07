class CreateStockImportHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :stock_import_histories do |t|
      t.integer :user_id

      t.timestamps
    end
  end
end
