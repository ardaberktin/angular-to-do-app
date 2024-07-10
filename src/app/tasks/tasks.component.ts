import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TasksService } from '../services/tasks.service';
import { SharedTasksService } from '../services/shared-tasks.service';
import { Task } from '../../types';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  completedTasks: Task[] = [];
  unCompletedTasks: Task[] = [];

  totalTaskNum: number = 0;
  completedTaskNum: number = 0;
  unCompletedTasksNum: number = 0;

  data: any;
  options: any;

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
    this.sharedTasksService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.updateChartData();
    });
    this.sharedTasksService.completedTasks$.subscribe((completedTasks) => {
      this.completedTasks = completedTasks;
      this.updateChartData();
    });
    this.sharedTasksService.unCompletedTasks$.subscribe((unCompletedTasks) => {
      this.unCompletedTasks = unCompletedTasks;
      this.updateChartData();
    });
    this.sharedTasksService.totalTaskNum$.subscribe((totalTaskNum) => {
      this.totalTaskNum = totalTaskNum;
      this.updateChartData();
    });
    this.sharedTasksService.completedTaskNum$.subscribe((completedTaskNum) => {
      this.completedTaskNum = completedTaskNum;
      this.updateChartData();
    });
    this.sharedTasksService.unCompletedTasksNum$.subscribe(
      (unCompletedTasksNum) => {
        this.unCompletedTasksNum = unCompletedTasksNum;
        this.updateChartData();
      }
    );
  }

  updateChartData() {
    this.data = {
      labels: ['Completed Tasks', 'Uncompleted Tasks'],
      datasets: [
        {
          data: [this.completedTaskNum, this.unCompletedTasksNum],
          backgroundColor: ['#42A5F5', '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#FFB74D'],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
        datalabels: {
          color: '#ffffff',
          font: {
            weight: 'bold',
            size: 20,
          },
          formatter: (value: number) => {
            return value;
          },
        },
      },
    };
  }
}
