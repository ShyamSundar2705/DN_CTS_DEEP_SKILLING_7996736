import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification/notification';

@Component({
  selector: 'app-notification',
  imports: [],
  // Component-level provider: every Notification instance gets its own NotificationService,
  // unlike a root-provided service which is shared across the whole application.
  providers: [
    NotificationService
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification implements OnInit {

  message = '';

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.message = 'Welcome back! You have no pending alerts.';
    this.notificationService.notify(this.message);
  }
}
