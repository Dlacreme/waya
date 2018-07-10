class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :name
      t.text :desc
      t.integer :product_category_id
      t.date :start_date
      t.date :end_date
      t.boolean :is_disabled, default: false

      t.timestamps
    end
  end
end
