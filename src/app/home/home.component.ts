import { Component, OnInit } from '@angular/core';
import { TasksComponent } from '../components/tasks/tasks.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  message: string = 'Widgets';
  totalTaskNum: number = 10;
  completedTaskNum: number = 0;
  unCompletedTasksNum: number = 0;
  isAddTask: boolean = false;

  completedTasks: Task[] = [];
  unCompletedTasks: Task[] = [];

  tasks: Task[] = [
    {
      name: '',
      body: '',
      completed: false,
      id: 0,
    },
    {
      name: '',
      body: '',
      completed: false,
      id: 1,
    },
    {
      name: '',
      body: '',
      completed: false,
      id: 2,
    },
    {
      name: '',
      body: '',
      completed: false,
      id: 3,
    },
    {
      name: '',
      body: '',
      completed: false,
      id: 4,
    },
  ];

  getTasks() {
    this.tasks[0].name = 'Deneme';
    this.tasks[0].body =
      'deneme124325412541deneme124325412541deneme124325412541deneme124325412541deneme124325412541deneme124325412541deneme124325412541deneme124325412541';

    this.tasks[1].name = 'Example Task 1';
    this.tasks[1].body = 'Description for Example Task 1';

    this.tasks[2].name = 'Example Task 2';
    this.tasks[2].body = 'Description for Example Task 2';

    this.tasks[3].name = 'Example Task 3';
    this.tasks[3].body = 'Description for Example Task 3';

    this.tasks[4].name = 'Example Task 4';
    this.tasks[4].body = 'Description for Example Task 4';
  }

  saveTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  loadTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  getTotalTasks() {
    this.totalTaskNum = this.tasks.length;
  }

  getCompletedTaskNum() {
    this.completedTaskNum = 0;
    this.tasks.forEach((task) => {
      if (task.completed) {
        this.completedTaskNum++;
      }
    });
  }

  getCompletedTasks() {
    this.completedTasks = this.tasks.filter((task) => task.completed);
    this.completedTaskNum = this.completedTasks.length;
  }

  getUnCompletedTasks() {
    this.unCompletedTasks = this.tasks.filter((task) => !task.completed);
    this.unCompletedTasksNum = this.unCompletedTasks.length;
  }

  addUnCompletedTasks(task: Task) {
    this.unCompletedTasks.push(task);
    this.unCompletedTasksNum++;
  }

  deleteUnCompletedTasks(task: Task) {
    const index = this.unCompletedTasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.unCompletedTasks.splice(index, 1);
      this.unCompletedTasksNum--;
    }
  }

  addCompletedTasks(task: Task) {
    this.completedTasks.push(task);
    this.completedTaskNum++;
  }

  deleteCompletedTasks(task: Task) {
    const index = this.completedTasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.completedTasks.splice(index, 1);
      this.completedTaskNum--;
    }
  }

  onTaskCompletionChange(updatedTask: Task): void {
    const foundIndex = this.tasks.findIndex(
      (task) => task.id === updatedTask.id
    );
    if (foundIndex !== -1) {
      this.tasks[foundIndex] = updatedTask; // Update the task in the tasks array
      if (updatedTask.completed) {
        this.addCompletedTasks(updatedTask); // Update completedTaskNum
        this.deleteUnCompletedTasks(updatedTask); // Remove from uncompleted tasks
      } else {
        this.deleteCompletedTasks(updatedTask);
        this.addUnCompletedTasks(updatedTask); // Add back to uncompleted tasks
      }
      this.saveTasks(this.tasks); // Save tasks to localStorage
    }
  }

  addTask(name: string, body: string) {
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
    this.addUnCompletedTasks(newTask);
    this.getTotalTasks();
    this.saveTasks(this.tasks);
  }

  ngOnInit(): void {
    this.tasks = this.loadTasks(); // Load tasks from localStorage
    this.getTasks();
    this.getTotalTasks();
    this.getCompletedTaskNum();
    this.getCompletedTasks();
    this.getUnCompletedTasks();
  }
}
