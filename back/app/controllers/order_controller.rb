class OrderController < ApplicationController
  before_action :require_login

  def index
    orders = Order
      .includes([:products])

    data orders.as_json(include: {
      :table => {},
      :customer => {},
      :order_status => {},
      :order_action_histories => {},
      :products => {
        include: [
          :product_prices => {}
        ]
      }
    })
  end

  def search
    # .where(order_status_id: params[:status_ids].split(','))
    orders = Order
      .where(:created_at => params[:from].to_datetime..params[:to].to_datetime)
      .includes([:products])

    data orders.as_json(include: {
      :table => {},
      :customer => {},
      :order_status => {},
      :order_action_histories => {},
      :products => {
        include: [
          :product_prices => {}
        ]
      }
    })
  end

  def show
    data order_detail(params[:id])
  end

  def create
    order = Order.new
    order.order_status_id = OrderStatusEnum::Pending;
    order.save!
    order.create_action(@current_user, get_param(:comment))
    data order_detail(order.id)
  end

  def status
    order = Order.find(params[:id])
    order.set_status(@current_user, get_param(:status_id), get_param(:comment))
    data order_detail(params[:id])
  end

  def table
    order = Order.find(params[:id])
    order.set_table(@current_user, get_param(:table_id), get_param(:comment))
    data order_detail(order.id)
  end

  def customer
    order = Order.find(params[:id])
    order.set_customer(@current_user, get_param(:user_id), get_param(:comment))
    order.calc_price
    data order_detail(order.id)
  end

  def products
    order = Order.find(params[:id])
    order.remove_products(get_param_array(:product_to_remove_ids))
    order.add_products(get_param_array(:product_to_add_ids))
    data order_detail(order.id)
  end

  def destroy
    Order.find(params[:id]).cancel(@current_user, get_param(:comment))
    ok
  end

  def payment
    order = Order.find(params[:id])
    order.payment(@current_user, get_param(:payment_method_id))
    data order_detail(order.id)
  end

  def add_voucher
    order = Order.find(params[:id])
    order.add_voucher(@current_user, params[:voucher_id])
    data order_detail(params[:id])
  end

  def remove_voucher
    order = Order.find(params[:id])
    order.remove_voucher(@current_user, params[:voucher_id])
    data order_detail(params[:id])
  end

private

  def order_detail(id)
    Order
      .where(id: id)
      .includes([:products])
      .first().as_json(include: {
        :table => {},
        :customer => {},
        :order_status => {},
        :products => {},
        :order_action_histories => {},
        :invoice => {}
      })
  end

  def get_param(param_name)
    params.permit(param_name)[param_name]
  end

  def get_param_array(param_name)
    params.permit(param_name => [])[param_name]
  end

end
