class CreateFriends < ActiveRecord::Migration[5.1]
  def change
    create_table :friends do |t|
      t.integer :from_id
      t.integer :to_id
      t.integer :friend_status_id

      t.timestamps
    end
  end
end
