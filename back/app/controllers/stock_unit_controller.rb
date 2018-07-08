class StockUnitController < ApplicationController

  def index
    data StockUnit.where(is_disabled: false)
  end
    
  def create
    save_form ItemForm.new(StockUnit.new), param_name
  end

  def update
    save_form ItemForm.new(StockUnit.find(params[:id])), param_name
  end

  def destroy
    StockUnit.update(params[:id], is_disabled: true);
    ok
  end

private

  def param_name
    params.require(:stock_unit).permit(:name)
  end

end
