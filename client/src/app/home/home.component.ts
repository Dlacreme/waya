import { Component, OnInit } from '@angular/core';
import { LanguageService, Language } from '../services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public availableLanguage:string;

  constructor(
    private languageService:LanguageService
  ) { }

  public ngOnInit():void {
    this.availableLanguage = this.languageService.getAvailableLanguage();
  }

  public switchLanguage(language:string) {
    this.languageService.setLanguage(language as Language);
    this.availableLanguage = this.languageService.getAvailableLanguage();
  }

}
