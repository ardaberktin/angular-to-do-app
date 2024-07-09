import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  nowYear!: number;

  ngOnInit() {
    this.nowYear = new Date().getFullYear();
  }
}
