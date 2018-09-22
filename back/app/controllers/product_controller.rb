class ProductController < ApplicationController

  #.where('product_prices.end_date IS null || product_prices.end_date > NOW()').references(:product_prices)
  def index
    pdts = Product
      .where(is_disabled: false)
      .includes([:product_category, :product_prices, :stocks => [:stock_format, :stock_type]])

    data pdts.as_json(include: {
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
      :product_prices => {},
      :standard_price => {},
      :member_price => {}
    },
      methods: :picture_url
    )

  end

  def show
    data load(params[:id])
  end

  def create
    ps = param_update
    form = ProductForm.new(Product.new)
    process_form form, {:name => ps[:name], :desc => ps[:desc], :product_category_id => ps[:product_category_id]}
    form.model.update_product_stocks(ps[:product_stocks]) unless ps[:product_stocks] == nil
    form.model.update_price(ps[:standard_price])
    form.model.update_price(ps[:member_price])
    data load(form.model.id)
  end

  def update
    ps = param_update
    form = ProductForm.new(Product.find(params[:id]))
    form.model.update_product_stocks(ps[:product_stocks]) unless ps[:product_stocks] == nil
    form.model.update_price(ps[:standard_price]) unless ps[:standard_price] == nil || ps[:standard_price][:id] != nil
    form.model.update_price(ps[:member_price]) unless ps[:member_price] == nil || ps[:member_price][:id] != nil
    process_form form, {:name => ps[:name], :desc => ps[:desc], :product_category_id => ps[:product_category_id]}

    data load(form.model.id)
  end

  def picture
    pdt = Product.find(params[:id])
    pdt.picture = params[:file]
    pdt.save
    data load(params[:id])
  end

  def destroy
    Product.update(params[:id], is_disabled: true)
    ok
  end

private

  def param_update
    params.permit(:name, :desc, :product_category_id, standard_price: [:price, :start_date, :product_price_type_id], member_price: [:price, :start_date, :product_price_type_id], product_stocks: [:id, :stock_id, :quantity])
  end

  def load(stock_id)
# .where('product_prices.end_date IS null || product_prices.end_date > NOW()').references(:product_prices)
    pdt = Product
    .where(id: stock_id)
    .includes([:product_category, :product_prices, :stocks => [:stock_format, :stock_type]])
    .first()

    pdt.standard_price = pdt.get_price(PriceTypeEnum::Standard)
    pdt.member_price = pdt.get_price(PriceTypeEnum::Member)

    json = pdt.as_json(include: {
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
      :product_prices => {},
      :standard_price => {},
      :member_price => {}
    }, methods: :picture_url)

    return json

  end

end
