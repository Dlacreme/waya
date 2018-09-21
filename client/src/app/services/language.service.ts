import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

export enum Language {
  EN = 'en',
  VN = 'vn'
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translateService:TranslateService
  ) {
    this.translateService.addLangs(['vn', 'en']);
  }

  public setDefaultLanguage():void {
    let favLanguage = window.localStorage.getItem(environment.languageToken);
    if (!favLanguage) {
      favLanguage = 'en';
    }
    this.setLanguage(favLanguage as Language);
  }

  public setLanguage(language:Language):void {
    window.localStorage.setItem(environment.languageToken, language);
    this.translateService.use(language);
  }

  public getAvailableLanguage():Language {
    return this.translateService.currentLang === Language.EN ?
      Language.VN : Language.EN;
  }

}
