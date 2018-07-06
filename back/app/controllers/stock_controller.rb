class StockController < ApplicationController

  def index
  end  
    
  def create
    render_json 501, "Should Create Stock"  
  end

end
