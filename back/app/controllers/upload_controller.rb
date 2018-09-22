class UploadController < ApplicationController

  def product
    pdt = Product.find(params[:id])
    pdt.picture params[:IMAGEDATA] if params[:IMAGEDATA].present?
    pdt.save if pdt.valid?
    data pdt
  end

private

  def param_upload
    params.permit(:content_type, :file_content, :filename)
  end

end
