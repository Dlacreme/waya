class Article < ApplicationRecord
  has_many :events

  has_attached_file :picture, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/product.png"
  validates_attachment :picture
  do_not_validate_attachment_file_type :picture

  def picture_url
    self.picture.as_json
  end

end
