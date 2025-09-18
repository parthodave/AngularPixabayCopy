import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() perPage = 20;
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<number>();

  get pageCount() {
    return Math.max(1, Math.ceil(this.total / this.perPage));
  }

  pages(): number[] {
    const last = this.pageCount;
    const start = Math.max(1, this.page - 2);
    const end = Math.min(last, start + 4);
    const arr: number[] = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  }
}
