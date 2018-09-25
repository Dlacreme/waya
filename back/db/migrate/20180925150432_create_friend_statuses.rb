class CreateFriendStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :friend_statuses do |t|
      t.string :name

      t.timestamps
    end
  end
end
