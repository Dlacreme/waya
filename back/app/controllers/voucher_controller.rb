class VoucherController < ApplicationController
  before_action :require_login

  def index
    data Voucher
      .where(is_disabled: false)
  end

  def show
    data Voucher.find(params[:id])
  end
    
  def create
    save_form VoucherForm.new(Voucher.new), param_voucher
  end

  def destroy
    Voucher.update(params[:id], is_disabled: true);
    ok
  end

private

  def param_voucher
    params.require(:voucher).permit(:code, :name, :desc, :voucher_type_id, :value)
  end
end
