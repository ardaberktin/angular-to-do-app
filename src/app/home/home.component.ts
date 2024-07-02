import { Component, OnInit } from '@angular/core';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../types';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksComponent, CommonModule],
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

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.tasksService.getTasksFromLocalStorage();
    this.updateTaskStats();
  }

  updateTaskStats(): void {
    this.totalTaskNum = this.tasks.length;
    this.completedTasks = this.tasks.filter((task) => task.completed);
    this.unCompletedTasks = this.tasks.filter((task) => !task.completed);
    this.completedTaskNum = this.completedTasks.length;
    this.unCompletedTasksNum = this.unCompletedTasks.length;
  }

  onTaskCompletionChange(updatedTask: Task): void {
    const foundIndex = this.tasks.findIndex(
      (task) => task.id === updatedTask.id
    );
    if (foundIndex !== -1) {
      this.tasks[foundIndex] = updatedTask;
      this.tasksService.saveTasksToLocalStorage(this.tasks);
      this.updateTaskStats();
    }
  }

  onDeleteTask(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.tasksService.saveTasksToLocalStorage(this.tasks);
      this.updateTaskStats();
    }
  }

  addTask(name: string, body: string): void {
    const newTask: Task = {
      name,
      body,
      completed: false,
      id:
        this.tasks.length > 0
          ? Math.max(...this.tasks.map((task) => task.id)) + 1
          : 0,
    };
    this.tasks.push(newTask);
    this.tasksService.saveTasksToLocalStorage(this.tasks);
    this.updateTaskStats();
  }

  toggleIsAddTask(): void {
    this.isAddTask = !this.isAddTask;
  }

  onSubmit(name: string, body: string): void {
    this.addTask(name, body);
    this.toggleIsAddTask();
  }
}
