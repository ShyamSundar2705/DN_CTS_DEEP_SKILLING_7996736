import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Breadcrumb
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}