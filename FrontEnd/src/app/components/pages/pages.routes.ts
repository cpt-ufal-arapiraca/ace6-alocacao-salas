import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const PagesRoutes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./pages.component').then((m) => m.PagesComponent),
        children: [
            { path: 'inicio', component: HomeComponent},
            { path: 'entrar', component: LoginComponent},
            { path: '', redirectTo: 'inicio', pathMatch: 'prefix'}
        ]
    },
];
