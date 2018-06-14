class CreateUserProviders < ActiveRecord::Migration[5.1]
  def change
    create_table :user_providers do |t|
      t.string :name

      t.timestamps
    end
  end
end
