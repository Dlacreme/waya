class ProductController < ApplicationController

  def index
    data Product
          .where(is_disabled: false)
          .as_json()
  end

  def show
    data Product
          .where(id: params[:id])
          .as_json()
          .first()
  end

  def create
    ps = param_update
    form = ProductForm.new(Product.new)
    process_form form, {:name => ps[:name], :desc => ps[:desc], :product_category_id => ps[:product_category_id]}
    form.model.update_product_stocks(ps[:stocks])
    form.model.update_price(ps[:price])
  end

  def update
    save_form ProductForm.new(Product.find(params[:id])), param_update
  end

  def destroy
    Product.update(params[:id], is_disabled: true)
    ok
  end

private

  def param_update
    params.permit(:name, :desc, :product_category_id, price: [:price, :member_price, :start_date], stocks: [:stock_id, :quantity])
  end


end
