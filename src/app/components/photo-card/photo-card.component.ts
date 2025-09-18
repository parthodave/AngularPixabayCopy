import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Photo } from '../../shared/models';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.css'
})
export class PhotoCardComponent {
  @Input() photo!: Photo;
}
