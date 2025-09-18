import { Routes } from '@angular/router';
import { SearchPage } from './pages/search/search.page';
import { DetailPage } from './pages/detail/detail.page';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'photos/search/nature' },
	{ path: 'photos/search/:query', component: SearchPage },
	{ path: 'photo/:id', component: DetailPage },
	{ path: '**', redirectTo: 'photos/search/nature' },
];
