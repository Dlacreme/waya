class CreateOrderActions < ActiveRecord::Migration[5.1]
  def change
    create_table :order_actions do |t|
      t.string :name

      t.timestamps
    end
  end
end
