import {Component, Input} from '@angular/core';
import {Notification} from "../../../core/models/notification.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() data!: Notification;
}
