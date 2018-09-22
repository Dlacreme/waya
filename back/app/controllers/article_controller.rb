class ArticleController < ApplicationController

  def index
    articles = Article.where(is_disabled: false)

    data articles.as_json(
      methods: :picture_url
    )
  end

  def show
    data load(params[:id])
  end

  def create
    save_form ArticleForm.new(Article.new), param
  end

  def update
    save_form ArticleForm.new(Article.find(params[:id])), param
  end

  def picture
    art = Article.find(params[:id])
    art.picture = params[:file]
    art.save
    data load(params[:id])
  end

  def destroy
    Article.update(params[:id], is_disabled: true)
    ok
  end

private

  def load(id)
    article = Article.find(id)
    article.as_json(
      methods: :picture_url
    )
  end

  def param
    params.require(:article).permit(:name, :desc, :content, :is_published)
  end

end
