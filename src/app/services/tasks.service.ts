import { Injectable } from '@angular/core';
import { Task } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private localStorageKey: string = 'tasks';

  constructor() {}

  getTasksFromLocalStorage(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
