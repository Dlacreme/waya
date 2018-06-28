class CreateProfileSexes < ActiveRecord::Migration[5.1]
  def change
    create_table :profile_sexes do |t|
      t.string :name

      t.timestamps
    end
  end
end
