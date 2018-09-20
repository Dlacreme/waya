import { Component, OnInit } from '@angular/core';
import { LanguageService, Language } from '../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public availableLanguage:string;

  constructor(
    private languageService:LanguageService,
    private router:Router
  ) { }

  public ngOnInit():void {
    this.availableLanguage = this.languageService.getAvailableLanguage();
  }

  public switchLanguage(language:string) {
    this.languageService.setLanguage(language as Language);
    this.availableLanguage = this.languageService.getAvailableLanguage();
  }

  public showOrder():boolean {
    return window.location.href.indexOf('order/new') === -1;
  }

  public goHome():void {
    this.router.navigate(['my-yana/news'])
  }

}
