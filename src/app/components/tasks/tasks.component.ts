import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../types';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  @Input() task!: Task;

  @Output() completedChange = new EventEmitter<Task>(); // Emit Task object
  @Output() deleteTask = new EventEmitter<Task>(); // Emit Task object for deletion

  toggleCompletion(): void {
    this.task.isCompleted = !this.task.isCompleted;
    this.completedChange.emit(this.task); // Emit the updated task
  }

  deleteThisTask(): void {
    console.log('delete');
    this.deleteTask.emit(this.task);
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }
}
