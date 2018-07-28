class ProductController < ApplicationController

  def index
    data Product
      .where(is_disabled: false)
      .includes([:product_category, :product_prices, :stocks => [:stock_format, :stock_type]])
      .where('product_prices.end_date IS null || product_prices.end_date > NOW()').references(:product_prices)
      .as_json(include: {
        :product_stocks => {
          include: [
            :stock => {
              include: [
                :stock_type,
                :stock_format => {
                  include: [
                    :stock_unit
                  ]
                },
              ]
            },
          ]
        },
        :product_category => {},
        :product_prices => {}
      })
  end

  def show
    data load(params[:id])
  end

  def create
    ps = param_update
    form = ProductForm.new(Product.new)
    process_form form, {:name => ps[:name], :desc => ps[:desc], :product_category_id => ps[:product_category_id]}
    form.model.update_product_stocks(ps[:product_stocks])
    form.model.update_price(ps[:product_prices].first)
    data Product
      .where(id: form.model.id)
      .as_json()
      .first()
  end

  def update
    ps = param_update
    form = ProductForm.new(Product.find(params[:id]))
    form.model.update_product_stocks(ps[:product_stocks])
    form.model.update_price(ps[:product_prices].first)
    process_form form, {:name => ps[:name], :desc => ps[:desc], :product_category_id => ps[:product_category_id]}

    data load(form.model.id)
  end

  def destroy
    Product.update(params[:id], is_disabled: true)
    ok
  end

private

  def param_update
    params.permit(:name, :desc, :product_category_id, product_prices: [:price, :member_price, :start_date], product_stocks: [:id, :stock_id, :quantity])
  end

  def load(stock_id)
    Product
    .where(id: stock_id)
    .includes([:product_category, :product_prices, :stocks => [:stock_format, :stock_type]])
    .where('product_prices.end_date IS null || product_prices.end_date > NOW()').references(:product_prices)
    .first()
    .as_json(include: {
      :product_stocks => {
        include: [
          :stock => {
            include: [
              :stock_type,
              :stock_format => {
                include: [
                  :stock_unit
                ]
              },
            ]
          },
        ]
      },
      :product_category => {},
      :product_prices => {}
    })
  end

end
