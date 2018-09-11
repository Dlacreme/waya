import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleDto, SocialService } from '../../api/social.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social-edit',
  templateUrl: './social-edit.component.html',
  styleUrls: ['./social-edit.component.scss']
})
export class SocialEditComponent implements OnInit, OnDestroy {

  public form:FormGroup;
  public submitPending = false;

  private article:ArticleDto = {
    name: '',
    desc: '',
    content: ''
  } as ArticleDto;

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
        if (params.id) {
          const id = Number(params.id);
          if (isNaN(id)) {
            return;
          }
          this.socialService.getArticle(id)
            .subscribe((res) => {
              this.article = res.data as ArticleDto;
              this.initForm();
            });
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
      )
    });
  }

  public submit():void {
    if (this.form.invalid) {
      return;
    }
    if (this.article.id) {
      this.submitSub = this.socialService.updateArticle({
        id: this.article.id as number,
        name: this.form.controls.name.value as string,
        desc: this.form.controls.desc.value as string,
        content: this.form.controls.content.value as string
      })
        .subscribe((res) => {
          this.article = res.data as ArticleDto,
          this.initForm();
          this.router.navigate(['/staff/social']);
        });
    } else {
      this.submitSub = this.socialService.createArticle({
        name: this.form.controls.name.value as string,
        desc: this.form.controls.desc.value as string,
        content: this.form.controls.content.value as string
      })
        .subscribe((res) => {
          this.article = res.data as ArticleDto,
          this.initForm();
          this.router.navigate(['/staff/social']);
        });
    }
  }

}
