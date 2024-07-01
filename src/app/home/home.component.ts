import { Component } from '@angular/core';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { Task, Tasks } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  message: string = 'Widgets';
  totalTaskNum: number = 10;
  tasks: Task[] = [{ name: '', body: '' }];

  getTasks() {
    this.tasks[0].name = 'deneme';
    this.tasks[0].body = 'deneme124325412541';
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
