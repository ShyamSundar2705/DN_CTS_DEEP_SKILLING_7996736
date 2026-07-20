import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { Loading } from './services/loading/loading';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    AsyncPipe,
    Header,
    Breadcrumb,
    LoadingSpinner
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private loadingService: Loading) { }

  get loading$() {
    return this.loadingService.loading$;
  }
}
