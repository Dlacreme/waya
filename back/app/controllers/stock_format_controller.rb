class StockFormatController < ApplicationController

  def index
    data StockFormat.where(is_disabled: false)
  end  
    
  def create
    save_form StockFormatForm.new(StockFormat.new), param_stock_format
  end

  def update
    save_form StockFormatForm.new(StockFormat.find(params[:id])), param_stock_format
  end

  def destroy
    StockFormat.update(params[:id], is_disabled: true);
    ok
  end

private

  def param_stock_format
    params.require(:stock_format).permit(:name, :stock_unit_id)
  end

end
