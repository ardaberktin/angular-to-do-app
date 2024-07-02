import { Component, Input } from '@angular/core';
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
  // TODO: Checkbox not working
}
