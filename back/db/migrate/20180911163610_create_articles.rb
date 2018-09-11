class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :name
      t.string :desc
      t.text :content
      t.boolean :is_disabled, default: false

      t.timestamps
    end
  end
end
