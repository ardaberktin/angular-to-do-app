import { Component, OnInit } from '@angular/core';
import { Task } from '../../types';
import { TasksService } from '../services/tasks.service';
import { SharedTasksService } from '../services/shared-tasks.service'; // Import the shared service
import { CommonModule } from '@angular/common';
import { TasksComponent } from '../components/tasks/tasks.component';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, TasksComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksPageComponent implements OnInit {
  tasks: Task[] = [];
  unCompletedTasksNum: any;
  isAddTask: any;
  unCompletedTasks: any;
  completedTaskNum: any;
  completedTasks: any;

  constructor(
    private taskService: TasksService,
    private sharedTasksService: SharedTasksService // Inject the shared service
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((newTasks: Task[]) => {
      this.tasks = newTasks;
      this.sharedTasksService.setTasks(this.tasks); // Update the shared service
    });
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
