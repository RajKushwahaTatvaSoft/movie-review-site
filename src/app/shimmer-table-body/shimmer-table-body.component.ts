import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shimmer-table-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shimmer-table-body.component.html',
  styleUrl: './shimmer-table-body.component.css',
})
export class ShimmerTableBodyComponent {
  @Input() columnCount = 6;
  @Input() rowCount = 10;

  constructor() {}

  get rowArray(): number[] {
    return Array(this.rowCount)
      .fill(0)
      .map((x, i) => i);
  }

  
  get colArray(): number[] {
    return Array(this.columnCount)
      .fill(0)
      .map((x, i) => i);
  }
}
