import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocialService, ArticleDto } from '../api/social.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit, OnDestroy {

  public articles:ArticleDto[] = [];

  private listSub = Subscription.EMPTY;

  constructor(
    private socialService:SocialService
  ) { }

  public ngOnInit():void {
    this.load();
  }

  public ngOnDestroy():void {
    this.listSub.unsubscribe();
  }

  public load():void {
    this.listSub = this.socialService.listArticle()
      .subscribe((res) => this.articles = res.data as ArticleDto[]);
  }

}
