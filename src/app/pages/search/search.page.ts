import { Component, Signal, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PhotosService } from '../../services/photos.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FiltersComponent, FiltersState } from '../../components/filters/filters.component';
import { PhotoCardComponent } from '../../components/photo-card/photo-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FiltersComponent, PhotoCardComponent, PaginationComponent],
  templateUrl: './search.page.html',
  styleUrl: './search.page.css'
})
export class SearchPage implements OnInit, OnDestroy {
  query = signal('nature');
  filters = signal<FiltersState>({
    type: 'all',
    orientation: 'all',
    order: 'popular',
    colors: 'any',
    category: 'all',
    safeSearch: true,
  });

  page = signal(1);
  perPage = signal(24);
  private sub = new Subscription();

  results = computed(() => this.photos.search({
    query: this.query(),
    type: this.filters().type,
    orientation: this.filters().orientation,
    order: this.filters().order,
    colors: this.filters().colors as any,
    category: this.filters().category,
    safeSearch: this.filters().safeSearch,
    page: this.page(),
    perPage: this.perPage(),
  }));

  totalPages() {
    const r = this.results();
    return Math.max(1, Math.ceil(r.total / r.perPage));
  }

  constructor(private photos: PhotosService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.params.subscribe((p: any) => {
        const q = (p['query'] ?? '').trim();
        if (q) this.query.set(q);
      })
    );
    this.sub.add(
      this.route.queryParams.subscribe((qp: Params) => {
        this.page.set(Math.max(1, Number(qp['page'] ?? 1)));
        const f = { ...this.filters() } as FiltersState;
        if (qp['type']) f.type = qp['type'];
        if (qp['orientation']) f.orientation = qp['orientation'];
        if (qp['order']) f.order = qp['order'];
        if (qp['colors']) f.colors = qp['colors'];
        if (qp['category']) f.category = qp['category'];
        if (qp['safeSearch'] !== undefined) f.safeSearch = qp['safeSearch'] !== 'false';
        this.filters.set(f);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSearch(q: string) {
    if (!q) return;
    this.page.set(1);
    this.router.navigate(['/photos/search', q], { queryParams: this.currentQueryParams() });
  }

  onFiltersChange(f: FiltersState) {
    this.page.set(1);
    this.filters.set(f);
    this.navigateWithQuery();
  }

  onPageChange(p: number) {
    this.page.set(p);
    this.navigateWithQuery();
  }

  private navigateWithQuery() {
    this.router.navigate(['/photos/search', this.query()], { queryParams: this.currentQueryParams() });
  }

  private currentQueryParams() {
    const f = this.filters();
    return {
      page: this.page(),
      type: f.type,
      orientation: f.orientation,
      order: f.order,
      colors: f.colors,
      category: f.category,
      safeSearch: f.safeSearch,
    };
  }
}
