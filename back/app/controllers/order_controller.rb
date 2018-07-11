class OrderController < ApplicationController
  before_action :require_login

  def index
  end
  
  def show
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
  end    
  
  def destroy
    Order.find(params[:id]).cancel(@current_user, get_param(:comment))
    ok
  end

private

  def order_detail(id)
    Order.find(id)
  end

  def get_param(param_name)
    params.permit(param_name)[param_name]
  end

end
