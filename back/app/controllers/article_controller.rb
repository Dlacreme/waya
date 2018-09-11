class ArticleController < ApplicationController

  def index
    data Article.where(is_disabled: false)
  end

  def show
    data Article.find(params[:id])
  end

  def create
    save_form ArticleForm.new(Article.new), param
  end

  def update
    save_form ArticleForm.new(Article.find(params[:id])), param
  end

  def destroy
    Article.update(params[:id], is_disabled: true)
    ok
  end

private

  def param
    params.require(:article).permit(:name, :desc, :content)
  end

end
