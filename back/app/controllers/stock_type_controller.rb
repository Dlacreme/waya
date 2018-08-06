class StockTypeController < ApplicationController

  def index
    data StockType.where(is_disabled: false)
  end

  def create
    save_form ItemForm.new(StockType.new), param_name
  end

  def update
    save_form ItemForm.new(StockType.find(params[:id])), param_name
  end

  def destroy
    StockType.update(params[:id], is_disabled: true);
    ok
  end

private

  def param_name
    params.require(:stock_type).permit(:name)
  end

end