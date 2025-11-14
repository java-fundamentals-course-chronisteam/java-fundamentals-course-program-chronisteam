import {Component, inject, signal, computed} from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import {Layout} from './shared/presentation/components/layout/layout';
import {TranslateService} from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [Layout, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('java-fundamentals-course-ChroniCaree');
  private translate: TranslateService;
  private router = inject(Router);
  protected readonly currentRoute = signal<string>('');
  protected readonly isUserRegistered = signal<boolean>(false);
  protected readonly showLayout = computed(() => {
    const route = this.currentRoute();
    const registered = this.isUserRegistered();
    // Only show layout if user is registered and not on register page
    return registered && route !== '/register';
  });

  constructor() {
    this.translate = inject(TranslateService);
    this.translate.addLangs(['en', 'es']);
    this.translate.use('en');
    
    // Check if user is registered on initialization
    this.checkUserRegistration();
    
    // Track current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute.set(event.url);
      // Always check registration status on navigation
      this.checkUserRegistration();
      
      // Use a small timeout to ensure the signal is updated before checking
      // This handles the case where registration happens and navigation occurs in quick succession
      setTimeout(() => {
        const registered = this.isUserRegistered();
        if (!registered && event.url !== '/register') {
          this.router.navigate(['/register']);
        }
      }, 0);
    });
    
    // Set initial route
    const initialUrl = this.router.url;
    this.currentRoute.set(initialUrl);
    
    // Check registration and redirect if necessary on initial load
    if (!this.isUserRegistered() && initialUrl !== '/register') {
      this.router.navigate(['/register']);
    }
    
    // Listen for storage changes from other tabs/windows
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', () => {
        this.checkUserRegistration();
      });
    }
  }
  
  private checkUserRegistration() {
    if (typeof window === 'undefined') {
      return;
    }
    const userName = localStorage.getItem('userName');
    const isNowRegistered = !!(userName && userName.trim().length > 0);
    this.isUserRegistered.set(isNowRegistered);
  }
}
