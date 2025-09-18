import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../shared/models';
import { CommonModule } from '@angular/common';
import { PhotoCardComponent } from '../../components/photo-card/photo-card.component';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, PhotoCardComponent],
  templateUrl: './detail.page.html',
  styleUrl: './detail.page.css'
})
export class DetailPage {
  private route = inject(ActivatedRoute);
  private photos = inject(PhotosService);

  id = 0;
  photo: Photo | undefined = undefined;
  related: Photo[] = [];

  constructor() {
    this.id = Number(this.route.snapshot.params['id']);
    const p = this.photos.getById(this.id);
    if (p) {
      this.photo = p;
      this.related = this.photos.relatedByTags(p, 12);
    }
  }
}
