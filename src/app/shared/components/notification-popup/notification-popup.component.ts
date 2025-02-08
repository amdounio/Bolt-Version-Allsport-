import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss'],
})
export class NotificationPopupComponent implements OnInit {
  notificationEnum = NotificationType
  message: string;
  type: string;
  show: boolean = false
  constructor(private notificationService: NotificationService) { }
  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(notification => {
      console.log("eeeeeeeeee");
      if (notification?.message) {
        this.show = true
        this.message = notification?.message;
        this.type = notification?.type

      }
      setTimeout(() => {
        this.show = false

      }
        , 4500
      );
      setTimeout(() => {
        this.message = ''
      }
        , 5000
      );
    });
  }

}
