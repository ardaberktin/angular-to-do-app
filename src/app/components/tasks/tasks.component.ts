import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../types';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input() task!: Task;

  @Output() completedChange = new EventEmitter<Task>(); // Emit Task object

  toggleCompletion(): void {
    this.task.completed = !this.task.completed;
    this.completedChange.emit(this.task); // Emit the updated task
  }

  SetTaskCompleted(task: Task) {
    task.completed = true;
    // console.log(task.completed + task.body);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
