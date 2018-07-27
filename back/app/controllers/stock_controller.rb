class StockController < ApplicationController

  def index
    data Stock
      .where(is_disabled: false)
      .includes([:stock_type, :stock_format => :stock_unit])
      .as_json(include: {:stock_type => {}, :stock_format => {
        include: :stock_unit
      }})
  end

  def show
    data load(params[:id])
  end

  def create
    history = StockImportHistory.new
    history.data = param_import[:_json].as_json
    history.save
    param_import[:_json].each do |x|
      existing_item = get_existing_stock(x)
      form = existing_item ? StockForm.new(existing_item) : StockForm.new(Stock.new)
      process_form form, x
    end
  end

  def update
    process_form StockForm.new(Stock.find(params[:id])), param_update
    data load(params[:id])
  end

  def destroy
    Stock.update(params[:id], is_disabled: true)
    ok
  end

private
  def param_import
    params.permit(:_json => [:id, :name, :desc, :balance, :size, :stock_format_id, :stock_type_id])
  end

  def get_existing_stock(item)
    return nil unless ! item.has_value?(:id)
    Stock.find_by_id(item[:id])
  end

  def param_update
    params.require(:stock).permit(:name, :desc, :balance, :size, :stock_format_id, :stock_type_id)
  end

  def load(stock_id)
    Stock
      .where(id: stock_id)
      .includes([:stock_type, :stock_format => :stock_unit])
      .as_json(include: {:stock_type => {}, :stock_format => {
        include: :stock_unit
      }})
      .first()
  end

end
