import { Component, OnInit } from '@angular/core';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../types';
import { TasksService } from '../services/tasks.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // loadTasks(): void {
  //   this.tasks = this.tasksService.getTasksFromLocalStorage();
  //   this.updateTaskStats();
  // }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((newtasks: Task[]) => {
      console.log(newtasks, 'new');
      this.tasks = newtasks;
      this.updateTaskStats();
    });
  }

  updateTaskStats(): void {
    console.log(this.tasks, 'update');
    this.totalTaskNum = this.tasks.length;
    this.completedTasks = this.tasks.filter((task) => task.isCompleted);
    this.unCompletedTasks = this.tasks.filter((task) => !task.isCompleted);
    this.completedTaskNum = this.completedTasks.length;
    this.unCompletedTasksNum = this.unCompletedTasks.length;
  }

  // updateTask(updatedTask: Task): void {
  //   const foundIndex = this.tasks.findIndex(
  //     (task) => task.id === updatedTask.id
  //   );
  //   if (foundIndex !== -1) {
  //     this.tasks[foundIndex] = updatedTask;
  //     this.tasksService.saveTasksToLocalStorage(this.tasks);
  //     this.updateTaskStats();
  //   }
  // }

  updateTask(task: Task): void {
    this.taskService.updateTask(task.id, task).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
        this.updateTaskStats();
      }
    });
  }

  // deleteTask(task: Task): void {
  //   const index = this.tasks.findIndex((t) => t.id === task.id);
  //   if (index !== -1) {
  //     this.tasks.splice(index, 1);
  //     this.tasksService.saveTasksToLocalStorage(this.tasks);
  //     this.updateTaskStats();
  //   }
  // }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.updateTaskStats();
    });
  }

  // createTask(name: string, body: string): void {
  //   const newTask: Task = {
  //     name,
  //     body,
  //     completed: false,
  //     id:
  //       this.tasks.length > 0
  //         ? Math.max(...this.tasks.map((task) => task.id)) + 1
  //         : 0,
  //   };
  //   this.tasks.push(newTask);
  //   this.tasksService.saveTasksToLocalStorage(this.tasks);
  //   this.updateTaskStats();
  // }

  createTask(title: string, description: string): void {
    const newTask: Task = {
      title,
      description,
      isCompleted: false,
      id:
        this.tasks.length > 0
          ? Math.max(...this.tasks.map((task) => task.id)) + 1
          : 1,
    };
    this.taskService.createTask(newTask).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.updateTaskStats();
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
