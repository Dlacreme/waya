class StockUnitController < ApplicationController

  def index
    data StockUnit.all
  end  
    
  def create
    save_form ItemForm.new(StockUnit.new), param_create
  end

  def update
    save_form ItemForm.new(StockUnit.find(params[:id])), param_create
  end

private

  def param_create
    params.require(:stock_unit).permit(:name)
  end

end
