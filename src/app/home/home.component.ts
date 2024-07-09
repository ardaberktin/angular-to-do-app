import { Component, OnInit } from '@angular/core';
import { SharedTasksService } from '../services/shared-tasks.service';
import { Task } from '../../types'; // Import the shared service

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  completedTasks: Task[] = [];
  unCompletedTasks: Task[] = [];
  totalTaskNum: number = 0;
  completedTaskNum: number = 0;
  unCompletedTasksNum: number = 0;

  constructor(private sharedTasksService: SharedTasksService) {}

  ngOnInit(): void {
    this.sharedTasksService.tasks$.subscribe((tasks) => (this.tasks = tasks));
    this.sharedTasksService.completedTasks$.subscribe(
      (completedTasks) => (this.completedTasks = completedTasks)
    );
    this.sharedTasksService.unCompletedTasks$.subscribe(
      (unCompletedTasks) => (this.unCompletedTasks = unCompletedTasks)
    );
    this.sharedTasksService.totalTaskNum$.subscribe(
      (totalTaskNum) => (this.totalTaskNum = totalTaskNum)
    );
    this.sharedTasksService.completedTaskNum$.subscribe(
      (completedTaskNum) => (this.completedTaskNum = completedTaskNum)
    );
    this.sharedTasksService.unCompletedTasksNum$.subscribe(
      (unCompletedTasksNum) => (this.unCompletedTasksNum = unCompletedTasksNum)
    );
  }
}
