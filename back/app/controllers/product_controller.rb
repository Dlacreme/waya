class ProductController < ApplicationController

  def index
    data Product
      .where(is_disabled: false)
      .includes([:stocks => [:stock_format, :stock_type]])
      .as_json(include: {
      :stocks => {
        include: [
          :stock_type,
          :stock_format => {
            include: [
              :stock_unit
            ]
          }
        ]}
      })
  end

  def show
    data Product
      .where(id: params[:id])
      .includes([:stocks => [:stock_format, :stock_type]])
      .first().as_json(include: {
      :stocks => {
        include: [
          :stock_type,
          :stock_format => {
            include: [
              :stock_unit
            ]
          }
        ]}
      })
          
  end

  def create
    ps = param_update
    form = ProductForm.new(Product.new)
    process_form form, {:name => ps[:name], :desc => ps[:desc], :product_category_id => ps[:product_category_id]}
    form.model.update_product_stocks(ps[:stocks])
    form.model.update_price(ps[:product_price])
    data Product
      .where(id: form.model.id)
      .as_json()
      .first()
  end

  def update
    ps = param_update
    form = ProductForm.new(Product.find(params[:id]))
    form.model.update_product_stocks(ps[:stocks])
    form.model.update_price(ps[:product_price])
    process_form form, {:name => ps[:name], :desc => ps[:desc], :product_category_id => ps[:product_category_id]}
    data Product
      .where(id: form.model.id)
      .as_json()
      .first()
  end

  def destroy
    Product.update(params[:id], is_disabled: true)
    ok
  end

private

  def param_update
    params.permit(:name, :desc, :product_category_id, product_price: [:price, :member_price, :start_date], stocks: [:product_stock_id, :stock_id, :quantity])
  end


end
