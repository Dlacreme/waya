class StockFormatController < ApplicationController

  def index
    data StockFormat
      .where(is_disabled: false)
      .includes(:stock_unit)
      .as_json(include: :stock_unit)
  end

  def create
    f = StockFormatForm.new(StockFormat.new)
    process_form f, param_stock_format
    data load(f.id)
  end

  def update
    process_form StockFormatForm.new(StockFormat.find(params[:id])), param_stock_format
    data load(params[:id])
  end

  def destroy
    StockFormat.update(params[:id], is_disabled: true);
    ok
  end

private

  def param_stock_format
    params.require(:stock_format).permit(:name, :stock_unit_id)
  end

  def load(id)
    StockFormat
      .where(id: id)
      .includes(:stock_unit)
      .first()
      .as_json(include: :stock_unit)
  end

end
