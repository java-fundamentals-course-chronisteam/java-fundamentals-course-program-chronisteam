import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';

@Component({
  selector: 'app-layout',
  imports: [
    MatButton,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    LanguageSwitcher,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  options = [
    {link: '/resource-1', label: 'option.home'},
    {link: '/resource-2', label: 'option.about'},
    {link: '/resource-3', label: 'option.courses'},
    {link: '/resource-4', label: 'option.categories'}
  ]
}
