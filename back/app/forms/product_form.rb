class ProductForm < Reform::Form
  property :name
  property :desc
  property :product_category_id
  property :start_date, default: DateTime.now
  property :end_date, default: nil
  
  validates :name, presence: true
end