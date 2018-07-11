class OrderController < ApplicationController
  before_action :require_login

  def index
    p "BITE CHATTE CUL"  
    data Order
      .where(order_status_id: [OrderStatusEnum::Pending, OrderStatusEnum::Validated, OrderStatusEnum::Ready, OrderStatusEnum::Paid])
      .includes([:products])
      .as_json(include: {
        :table => {},
        :customer => {},
        :order_status => {},
        :products => {}
      })
  end
  
  def show
    data order_detail(params[:id])
  end
  
  def create
    order = Order.new
    order.order_status_id = @current_user.staff? || @current_user.admin? ? OrderStatusEnum::Validated : OrderStatusEnum::Pending;
    order.save!
    order.create_action(@current_user, get_param(:comment))
    data order_detail(order.id)
  end
  
  def table
    order = Order.find(params[:id])
    order.set_table(@current_user, get_param(:table_id), get_param(:comment))
    data order_detail(order.id)
  end
  
  def customer
    order = Order.find(params[:id])
    order.set_customer(@current_user, get_param(:user_id), get_param(:comment))
    data order_detail(order.id)
  end
  
  def products
    order = Order.find(params[:id])
    order.remove_products(get_param_array(:order_product_to_remove_ids))
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

private

  def order_detail(id)
    Order
      .where(id: params[:id])
      .includes([:products])
      .first().as_json(include: {
        :table => {},
        :customer => {},
        :order_status => {},
        :products => {}
      })
  end

  def get_param(param_name)
    params.permit(param_name)[param_name]
  end

  def get_param_array(param_name)
    params.permit(param_name => [])[param_name]  
  end

end
