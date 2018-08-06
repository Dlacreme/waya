class TableController < ApplicationController

  def index
    data Table.where(is_disabled: false)
  end

  def create
    save_form ItemDescForm.new(Table.new), param_name
  end

  def update
    save_form ItemDescForm.new(Table.find(params[:id])), param_name
  end

  def destroy
    Table.update(params[:id], is_disabled: true);
    ok
  end

private

  def param_name
    params.require(:table).permit(:name, :desc)
  end

end
