import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleDto, SocialService, EventDto } from '../../api/social.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-social-edit',
  templateUrl: './social-edit.component.html',
  styleUrls: ['./social-edit.component.scss']
})
export class SocialEditComponent implements OnInit, OnDestroy {

  public form:FormGroup;
  public submitPending = false;
  public isEvent = false;
  public article:ArticleDto = {
    name: '',
    desc: '',
    content: ''
  } as ArticleDto;
  public event:EventDto = {
    slots: 100,
    event_time: new Date(),
    article: this.article
  } as EventDto;
  public pictureUrl = '';

  private paramSub = Subscription.EMPTY;
  private submitSub = Subscription.EMPTY;

  constructor(
    private socialService:SocialService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  public ngOnInit():void {
    this.initForm();
    this.paramSub = this.route.params
      .subscribe((params) => {
        if (!params.type) {
          return;
        }
        if (params.id) {
          const id = Number(params.id);
          if (isNaN(id)) {
            return;
          }
          if (params.type === 'event') {
            this.isEvent = true;
            this.socialService.getEvent(id)
              .subscribe((res) => {
                this.event = res.data as EventDto;
                this.article = (res.data as EventDto).article
                this.pictureUrl = `${environment.wayaApi}${this.article.picture_url}`
                this.initForm();
              });
          } else {
            this.isEvent = false;
            this.socialService.getArticle(id)
            .subscribe((res) => {
              this.article = res.data as ArticleDto;
              this.pictureUrl = `${environment.wayaApi}${this.article.picture_url}`
              this.initForm();
            });
          }
        }
      });
  }

  public ngOnDestroy():void {
    this.paramSub.unsubscribe();
    this.submitSub.unsubscribe();
  }

  public initForm():void {
    this.form = new FormGroup({
      name: new FormControl(
        this.article.name,
        [Validators.required]
      ),
      desc: new FormControl(
        this.article.desc,
        [Validators.required]
      ),
      content: new FormControl(
        this.article.content,
        [Validators.required]
      ),
      is_published: new FormControl(
        this.article.is_published,
        [Validators.required]
      ),
      slots: new FormControl(
        this.event.slots.toString(),
      ),
      event_time: new FormControl(
        this.event.event_time,
      )
    });
  }

  public submit():void {
    if (this.form.invalid) {
      return;
    }

    if (this.isEvent) {
      if (this.event.id) {
        this.submitSub = this.socialService.updateEvent(this.buildEventParams(this.event.id))
          .subscribe((res) => this.router.navigate(['/staff/social']));
      } else {
        this.submitSub = this.socialService.createEvent(this.buildEventParams())
          .subscribe((res) => this.router.navigate(['/staff/social']));
      }
    } else {
      if (this.article.id) {
        this.submitSub = this.socialService.updateArticle(this.buildArticleParams(this.article.id))
          .subscribe((res) => this.router.navigate(['/staff/social']));
      } else {
        this.submitSub = this.socialService.createArticle(this.buildArticleParams())
          .subscribe((res) => this.router.navigate(['/staff/social']));
      }
    }

  }

  public buildEventParams(id:number|undefined = undefined):any {
    const obj = this.buildArticleParams();
    let objEv:any = {
      name: obj.name,
      desc: obj.desc,
      content: obj.content,
      is_published: obj.is_published,
      event_time: this.form.controls.event_time.value,
      slots: this.form.controls.slots.value
    };
    if (id) {
      objEv.id = id;
    }
    return objEv;
  }

  public buildArticleParams(id:number|undefined = undefined):any {
    const obj = {
      name: this.form.controls.name.value as string,
      desc: this.form.controls.desc.value as string,
      content: this.form.controls.content.value as string,
      is_published: this.form.controls.is_published.value as boolean
    } as ArticleDto;
    if (id) {
      obj.id = id as number;
    }
    return obj;
  }

}
