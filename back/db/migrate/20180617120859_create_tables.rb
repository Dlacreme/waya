class CreateTables < ActiveRecord::Migration[5.1]
  def change
    create_table :tables do |t|
      t.string :name
      t.string :desc
      t.boolean :is_disabled, default: false

      t.timestamps
    end
  end
end
