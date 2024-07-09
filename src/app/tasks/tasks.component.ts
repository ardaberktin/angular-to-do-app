import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  data: any;
  options: any;
}
