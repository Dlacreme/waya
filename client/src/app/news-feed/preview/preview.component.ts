import { Component, Input } from '@angular/core';
import { ArticleDto, EventDto } from '../../services/social.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

  public articleData:ArticleDto = {} as ArticleDto;
  public eventData:EventDto = undefined;
  public pictureUrl:string;

  constructor() { }

  @Input()
  set article(article:ArticleDto) {
    this.articleData = article;
    this.pictureUrl = `${environment.wayaApi}${this.articleData.picture_url}`
  }

  @Input()
  set event(event:EventDto) {
    this.eventData = event;
    this.articleData = event.article;
    this.pictureUrl = `${environment.wayaApi}${this.articleData.picture_url}`
  }

}
