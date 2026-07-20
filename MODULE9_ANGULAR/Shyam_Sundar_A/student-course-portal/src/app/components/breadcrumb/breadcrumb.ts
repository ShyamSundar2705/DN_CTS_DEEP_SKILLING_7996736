import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription, filter } from 'rxjs';

interface Crumb {
  label: string;
  url: string;
}

const CRUMB_LABELS: Record<string, string> = {
  courses: 'Courses',
  profile: 'Profile',
  enroll: 'Enroll',
  reactive: 'Reactive Enroll',
  'add-course': 'Add Course',
  login: 'Login',
};

@Component({
  selector: 'app-breadcrumb',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb implements OnInit, OnDestroy {

  crumbs: Crumb[] = [];

  private subscription?: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.buildCrumbs(this.router.url);

    this.subscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => this.buildCrumbs(event.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private buildCrumbs(url: string): void {
    const segments = url.split('?')[0].split('/').filter(Boolean);
    const crumbs: Crumb[] = [{ label: 'Home', url: '/' }];

    let path = '';
    for (const segment of segments) {
      path += `/${segment}`;
      const label = CRUMB_LABELS[segment] ?? (Number.isNaN(Number(segment)) ? segment : 'Details');
      crumbs.push({ label, url: path });
    }

    this.crumbs = crumbs;
  }
}
