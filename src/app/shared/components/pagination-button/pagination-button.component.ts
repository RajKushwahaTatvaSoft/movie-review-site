import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { start } from 'repl';

@Component({
  selector: 'app-pagination-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-button.component.html',
  styleUrl: './pagination-button.component.css',
})
export class PaginationButtonComponent {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 1;
  @Input() totalItems: number = 1;
  readonly buttonNextToCurrent: number = 2;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  get startingPointForPrevious():number{
    
    if (this.buttonToRenderPrevious > (this.buttonNextToCurrent + 1)) {
      return this.currentPage - this.buttonNextToCurrent;
    } else {
      return 2;
    }

  }

  get buttonToRenderNext():number{
    return this.totalPages - this.currentPage - 1;
  }

  get buttonToRenderPrevious():number{
    return (this.currentPage-2);
  }

  get hasNextPage(): boolean {
    if (this.currentPage === this.totalPages) {
      return false;
    } else {
      return true;
    }
  }

  get hasPreviousPage(): boolean {
    if (this.currentPage === 1) {
      return false;
    } else {
      return true;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      console.log(page);
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }

  counter(i: number) {
    return new Array(i);
  }
}
