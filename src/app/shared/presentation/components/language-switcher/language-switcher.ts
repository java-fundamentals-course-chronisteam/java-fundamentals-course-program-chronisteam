import {Component, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  protected currentLanguage: string = 'en';
  protected languages = ['en', 'es'];

  private translate: TranslateService;

  constructor() {
    this.translate = inject(TranslateService);
    this.currentLanguage = this.translate.getCurrentLang() || 'en';
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLanguage = lang;
  }
}
