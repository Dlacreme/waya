class CreateOrderActionHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :order_action_histories do |t|
      t.integer :order_action_id
      t.integer :user_id
      t.text :comment

      t.timestamps
    end
  end
end
