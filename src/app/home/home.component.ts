import { Component, OnInit } from '@angular/core';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../types';
import { TasksService } from '../services/tasks.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedTasksService } from '../services/shared-tasks.service'; //

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksComponent, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];

  completedTasks: Task[] = [];
  unCompletedTasks: Task[] = [];

  totalTaskNum: number = 0;
  completedTaskNum: number = 0;
  unCompletedTasksNum: number = 0;

  isAddTask: boolean = false;

  constructor(
    private taskService: TasksService,
    private sharedTasksService: SharedTasksService // Inject the shared service
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.updateTaskStats();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((newTasks: Task[]) => {
      this.tasks = newTasks;
      this.sharedTasksService.setTasks(this.tasks); // Update the shared service
    });
  }

  updateTaskStats() {
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

  updateTask(task: Task): void {
    this.taskService.updateTask(task.id, task).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
        this.sharedTasksService.setTasks(this.tasks); // Update the shared service
      }
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.sharedTasksService.setTasks(this.tasks); // Update the shared service
    });
  }

  createTask(title: string, description: string): void {
    const newIDNum3 = Math.floor(Math.random() * (9999999 - 1 + 1) + 1);

    const newTask: Task = {
      id: newIDNum3,
      title,
      description,
      isCompleted: false,
    };

    this.taskService.createTask(newTask).subscribe((createdTask) => {
      this.tasks.push(createdTask);
      this.sharedTasksService.setTasks(this.tasks); // Update the shared service
    });
  }

  toggleIsAddTask(): void {
    this.isAddTask = !this.isAddTask;
  }

  onSubmit(name: string, body: string): void {
    this.createTask(name, body);
    this.toggleIsAddTask();
  }
}
