import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksPageComponent } from './tasks/tasks.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
];
