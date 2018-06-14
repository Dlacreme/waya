class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email, unique: true
      t.string :provider_id
      t.integer :user_provider_id
      t.string :token
      t.string :password_digest

      t.timestamps null: false
    end
  end
end
