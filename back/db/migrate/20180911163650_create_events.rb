class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.integer :slots
      t.integer :article_id
      t.datetime :event_time

      t.timestamps
    end
  end
end
