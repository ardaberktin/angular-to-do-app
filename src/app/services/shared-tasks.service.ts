import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../types'; // Adjust the path as needed

@Injectable({
  providedIn: 'root',
})
export class SharedTasksService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private completedTasksSubject = new BehaviorSubject<Task[]>([]);
  completedTasks$ = this.completedTasksSubject.asObservable();

  private unCompletedTasksSubject = new BehaviorSubject<Task[]>([]);
  unCompletedTasks$ = this.unCompletedTasksSubject.asObservable();

  private totalTaskNumSubject = new BehaviorSubject<number>(0);
  totalTaskNum$ = this.totalTaskNumSubject.asObservable();

  private completedTaskNumSubject = new BehaviorSubject<number>(0);
  completedTaskNum$ = this.completedTaskNumSubject.asObservable();

  private unCompletedTasksNumSubject = new BehaviorSubject<number>(0);
  unCompletedTasksNum$ = this.unCompletedTasksNumSubject.asObservable();

  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
    this.updateTaskStats(tasks);
  }

  private updateTaskStats(tasks: Task[]): void {
    const completedTasks = tasks.filter((task) => task.isCompleted);
    const unCompletedTasks = tasks.filter((task) => !task.isCompleted);

    this.completedTasksSubject.next(completedTasks);
    this.unCompletedTasksSubject.next(unCompletedTasks);
    this.totalTaskNumSubject.next(tasks.length);
    this.completedTaskNumSubject.next(completedTasks.length);
    this.unCompletedTasksNumSubject.next(unCompletedTasks.length);
  }
}
