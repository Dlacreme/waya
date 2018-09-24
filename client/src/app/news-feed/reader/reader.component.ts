import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto, SocialService } from '../../services/social.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public article:ArticleDto = {} as ArticleDto;
  public pictureUrl:string;

  private getSub = Subscription.EMPTY;
  private paramSub = Subscription.EMPTY;

  constructor(
    private socialService:SocialService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  public ngOnInit():void {
    this.route.params.subscribe((p) => {
      if (p.id) {
        this.getSub = this.socialService.getArticle(p.id)
          .subscribe((res) => {
            this.article = res.data as ArticleDto;
            this.pictureUrl = `${environment.wayaApi}/${this.article.picture_url}`
          });
      } else {
        this.router.navigate(['/my-yana/news-feed']);
      }
    })
  }

}
