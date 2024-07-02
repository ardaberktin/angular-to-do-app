import { Component } from '@angular/core';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { Task, Tasks } from '../../types';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksComponent, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  message: string = 'Widgets';
  totalTaskNum: number = 10;
  tasks: Task[] = [
    { name: '', body: '' },
    { name: '', body: '' },
    { name: '', body: '' },
    { name: '', body: '' },
    { name: '', body: '' },
  ];

  getTasks() {
    this.tasks[0].name = 'Deneme';
    this.tasks[0].body = 'deneme124325412541';

    this.tasks[1].name = 'Example Task 1';
    this.tasks[1].body = 'Description for Example Task 1';

    this.tasks[2].name = 'Example Task 2';
    this.tasks[2].body = 'Description for Example Task 2';

    this.tasks[3].name = 'Example Task 3';
    this.tasks[3].body = 'Description for Example Task 3';

    this.tasks[4].name = 'Example Task 4';
    this.tasks[4].body = 'Description for Example Task 4';
  }

  getTotalTasks() {
    this.totalTaskNum = this.tasks.length;
  }

  ngOnInit(): void {
    this.getTasks();
    this.getTotalTasks();
  }
}
