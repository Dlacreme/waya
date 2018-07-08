class CreateProductCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :product_categories do |t|
      t.string :name
      t.integer :parent_id
      t.boolean :is_disabled, default: false

      t.timestamps
    end
  end
end
