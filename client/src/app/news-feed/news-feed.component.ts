import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleDto, EventDto, SocialService } from '../services/social.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit, OnDestroy {

  public loadingArticle = false;
  public loadingEvent = false;
  public displaySuccessOrder = false;

  public articles:ArticleDto[] = [];

  private getArticlesSub = Subscription.EMPTY;
  private getEventsSub = Subscription.EMPTY;
  private paramSub = Subscription.EMPTY;

  constructor(
    private route:ActivatedRoute,
    private socialService:SocialService
  ) { }

  public ngOnInit():void {
    this.loadArticles();
    this.paramSub = this.route.params
    .subscribe((p) => {
      if (p.action && p.action === 'order_validated') {
        this.displaySuccessOrder = true;
      }
    });
  }

  public ngOnDestroy():void {
    this.getArticlesSub.unsubscribe();
    this.getEventsSub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  public loadArticles():void {
    this.loadingArticle = true;
    this.getArticlesSub = this.socialService.listArticle()
      .subscribe((res) => {
        this.articles = res.data as ArticleDto[];
        this.loadingArticle = false;
      });
  }

  public readArticle(article:ArticleDto):void {

  }

  public readEvent(event:EventDto):void {

  }

}
