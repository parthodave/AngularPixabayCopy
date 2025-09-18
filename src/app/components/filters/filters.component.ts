import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhotosService } from '../../services/photos.service';
import { Orientation, Order } from '../../shared/models';

export interface FiltersState {
  type: 'all' | 'photo' | 'illustration' | 'vector';
  orientation: Orientation;
  order: Order;
  colors: string;
  category: string;
  safeSearch: boolean;
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Input() state!: FiltersState;
  @Output() stateChange = new EventEmitter<FiltersState>();

  constructor(public photos: PhotosService) {}

  update() {
    this.stateChange.emit({ ...this.state });
  }
}
