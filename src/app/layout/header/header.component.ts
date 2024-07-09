import { Component } from '@angular/core';
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
  public routerLinkVariable = '/home';
}
