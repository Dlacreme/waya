class CreateUserProviderHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :user_provider_histories do |t|
      t.integer :user_id
      t.integer :user_provider_id
      t.string :provider_id
      t.string :token

      t.timestamps
    end
  end
end
