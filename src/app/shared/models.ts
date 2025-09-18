export type ImageType = 'photo' | 'illustration' | 'vector';
export type Orientation = 'all' | 'horizontal' | 'vertical';
export type Order = 'popular' | 'latest';

export interface User {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface Photo {
  id: number;
  pageURL: string;
  previewURL: string;
  webformatURL: string;
  largeImageURL: string;
  width: number;
  height: number;
  type: ImageType;
  orientation: Exclude<Orientation, 'all'>;
  color?: string;
  category: string;
  tags: string[];
  user: User;
  likes: number;
  comments: number;
  downloads: number;
  views: number;
  createdAt: string; // ISO date
}

export interface SearchFilters {
  query: string;
  type: ImageType | 'all';
  orientation: Orientation;
  order: Order;
  colors: 'any' | 'grayscale' | 'transparent' | 'red' | 'orange' | 'yellow' | 'green' | 'turquoise' | 'blue' | 'lilac' | 'pink' | 'white' | 'gray' | 'black' | 'brown';
  category: 'all' | string;
  safeSearch: boolean;
  page: number;
  perPage: number;
}

export interface PagedResult<T> {
  total: number;
  totalHits: number;
  hits: T[];
  page: number;
  perPage: number;
}
