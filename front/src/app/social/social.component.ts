import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocialService, ArticleDto, EventDto } from '../api/social.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {

  public articles:ArticleDto[] = [];
  public events:EventDto[] = [];

  private articleListSub = Subscription.EMPTY;
  private eventListSub = Subscription.EMPTY;

  constructor(
    private socialService:SocialService
  ) { }

  public ngOnInit():void {
    this.load();
  }

  public ngOnDestroy():void {
    this.articleListSub.unsubscribe();
    this.eventListSub.unsubscribe();
  }

  public load():void {
    this.articleListSub = this.socialService.listArticle()
      .subscribe((res) => this.articles = res.data as ArticleDto[]);
    this.eventListSub = this.socialService.listEvent()
      .subscribe((res) => this.events = res.data as EventDto[]);
  }

}
