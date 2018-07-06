class StockController < ApplicationController

  def index
    render_json 501, "Should Display Stock"
  end  
    
  def create
    render_json 501, "Should Create Stock"
  end

  def update
    render_json 501, "Should Update Stock"  
  end

end
