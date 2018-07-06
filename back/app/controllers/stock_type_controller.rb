class StockTypeController < ApplicationController

  def index
    render_json 501, "Should Display Stock Types"
  end  
    
  def create
    render_json 501, "Should Create Stock Types"
  end

  def update
    render_json 501, "Should Update Stock Types"  
  end

end