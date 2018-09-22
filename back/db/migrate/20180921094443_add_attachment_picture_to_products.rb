class AddAttachmentPictureToProducts < ActiveRecord::Migration[5.1]
  def self.up
    change_table :products do |t|
      t.attachment :picture
    end
  end

  def self.down
    remove_attachment :products, :picture
  end
end
