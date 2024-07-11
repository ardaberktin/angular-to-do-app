import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HomeComponent } from '../../home/home.component';
import { TasksComponent } from '../../tasks/tasks.component';
import { ProfileComponent } from '../../profile/profile.component';
import { AboutComponent } from '../../about/about.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HomeComponent,
    TasksComponent,
    ProfileComponent,
    AboutComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // public routerLinkVariable = '/home';
  public currentRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  isActive(url: string): boolean {
    return this.currentRoute === url;
  }
}
