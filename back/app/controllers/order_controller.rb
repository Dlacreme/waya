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
    order.action_create(@current_user.id)
  end
  
  def update
  end
  
  def destroy
    
  end

private

end
