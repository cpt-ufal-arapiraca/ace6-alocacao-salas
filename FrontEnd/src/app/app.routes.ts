import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/error/not-found/not-found.component';

export const routes: Routes = [
    { 
        path: '', 
        loadChildren: () => import('./components/pages/pages.routes').then((m) => m.PagesRoutes)
    },
    { path: '**', component: NotFoundComponent},
];
