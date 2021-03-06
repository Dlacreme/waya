class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email, unique: true
      t.string :password_digest
      t.integer :role_id
      t.integer :credit, default: 0

      t.timestamps null: false
    end
  end
end
