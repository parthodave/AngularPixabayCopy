import { computed, Injectable, signal } from '@angular/core';
import { MOCK_PHOTOS } from '../shared/mock-photos';
import { Orientation, Order, PagedResult, Photo, SearchFilters } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private allPhotos = signal<Photo[]>(MOCK_PHOTOS);

  readonly categories = computed(() => Array.from(new Set(this.allPhotos().map(p => p.category))).sort());
  readonly colors = [
    'any','grayscale','transparent','red','orange','yellow','green','turquoise','blue','lilac','pink','white','gray','black','brown'
  ] as const;

  getById(id: number): Photo | undefined {
    return this.allPhotos().find(p => p.id === id);
  }

  relatedByTags(photo: Photo, limit = 10): Photo[] {
    const tags = new Set(photo.tags);
    return this.allPhotos()
      .filter(p => p.id !== photo.id && p.tags.some(t => tags.has(t)))
      .slice(0, limit);
  }

  search(raw: Partial<SearchFilters>): PagedResult<Photo> {
    const filters: SearchFilters = {
      query: (raw.query ?? '').trim().toLowerCase(),
      type: raw.type ?? 'all',
      orientation: raw.orientation ?? 'all',
      order: raw.order ?? 'popular',
      colors: raw.colors ?? 'any',
      category: raw.category ?? 'all',
      safeSearch: raw.safeSearch ?? true,
      page: Math.max(1, raw.page ?? 1),
      perPage: Math.min(200, Math.max(3, raw.perPage ?? 20)),
    };

    let results = this.allPhotos();

    if (filters.query) {
      const q = filters.query;
      results = results.filter(p =>
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (filters.type !== 'all') {
      results = results.filter(p => p.type === filters.type);
    }

    if (filters.orientation !== 'all') {
      results = results.filter(p => p.orientation === filters.orientation);
    }

    if (filters.colors !== 'any') {
      results = results.filter(p => (p.color ?? '').toLowerCase() === filters.colors);
    }

    if (filters.category !== 'all') {
      results = results.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.order === 'popular') {
      results = [...results].sort((a, b) => b.likes + b.downloads + b.views - (a.likes + a.downloads + a.views));
    } else {
      results = [...results].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    }

    const total = results.length;
    const start = (filters.page - 1) * filters.perPage;
    const hits = results.slice(start, start + filters.perPage);

    return {
      total,
      totalHits: total,
      hits,
      page: filters.page,
      perPage: filters.perPage,
    };
  }
}
