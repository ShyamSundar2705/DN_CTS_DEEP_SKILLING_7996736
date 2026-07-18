import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  notify(message: string): void {
    console.log(message);
  }
}
