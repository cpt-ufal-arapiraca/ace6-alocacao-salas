import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./components/pages/pages.routes').then((m) => m.PagesRoutes)},
    { path: '**', loadComponent: () => import('./components/pages/error/not-found/not-found.component').then((m) => m.NotFoundComponent)},
];
