class EventController < ApplicationController

  def index
    events = Event
      .includes([:article])



    data events.as_json(include: {
      :article => {}
    })

  end

  def show
    data load(params[:id])
  end

  def create
    article = Article.new
    process_form ArticleForm.new(article), param_article
    ps = param_event
    ps[:article_id] = article.id
    form = EventForm.new(Event.new)
    process_form form, ps
    data load(form.model.id)
  end

  def update
    ev = Event.find(params[:id])
    process_form EventForm.new(ev), param_event
    process_form ArticleForm.new(Article.find(ev.article_id)), param_article
    data load(ev.id)
  end

  def destroy
    Event.update(params[:id], is_disabled: true)
    ok
  end

private

  def load(event_id)
    ev = Event
      .includes(:article)
      .find(event_id)

    ev.as_json(include: {
      :article => {}
    })
  end

  def param_article
    params.permit(:name, :desc, :content, :is_published)
  end

  def param_event
    params.require(:event).permit(:name, :slots, :event_time)
  end

end
