import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../environments/environment';
import { SessionService } from './services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private router:Router,
    private languageService: LanguageService,
    private sessionService: SessionService
  ) { }

  public ngOnInit():void {
    this.tryAuth();
    this.setLanguage();
  }

  public ngOnDestroy():void {
  }

  private tryAuth():void {
    const token = window.localStorage.getItem(environment.authToken);
    if (token) {
      this.sessionService.setToken(token);
      // this.router.navigate(['my-yana/news']);
    }
  }

  private setLanguage():void {
    this.languageService.setDefaultLanguage();
  }

}
