import { Component, Input } from '@angular/core';
import { ArticleDto, EventDto } from '../../services/social.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

  public articleData:ArticleDto = {} as ArticleDto;
  public eventData:EventDto = undefined;

  constructor() { }

  @Input()
  set article(article:ArticleDto) {
    this.articleData = article;
  }

  @Input()
  set event(event:EventDto) {
    this.eventData = event;
  }

}
