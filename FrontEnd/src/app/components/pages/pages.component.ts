import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {
  isSidebarOpen = false;
  constructor(private router: Router){}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  isActive(route: string): boolean {
    return this.router.isActive(route, true);
}
}
