class ProductCategoryController < ApplicationController
  def index
    data ProductCategory.where(is_disabled: false)
  end  
    
  def create
    save_form ItemForm.new(ProductCategory.new), param_name
  end

  def update
    save_form ItemForm.new(ProductCategory.find(params[:id])), param_name
  end

  def destroy
    ProductCategory.update(params[:id], is_disabled: true);
    ok
  end

private
  def param_name
    params.require(:product_category).permit(:name)
  end
end
