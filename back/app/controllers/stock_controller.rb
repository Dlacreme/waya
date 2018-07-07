class StockController < ApplicationController

  def index
    render_json 501, "Should Display Stock"
  end  
    
  def create
    param_import[:_json].each do |x|
      existing_item = get_existing_stock(x)
      form = existing_item ? StockForm.new(existing_item) : StockForm.new(Stock.new)
      process_form form, x
    end
  end

  def update
    render_json 501, "Should Update Stock"  
  end

private
  def param_import
    params.permit(:_json => [:id, :name, :desc, :balance, :size, :stock_format_id, :stock_type_id])
  end

  def get_existing_stock(item)
    return nil unless ! item.has_value?(:id)
    Stock.find_by_id(item[:id])
  end

end
