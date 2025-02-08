import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from "ngx-toastr";
import { NotificationComponent } from "../components/notification/notification.component";
import { Notification } from "../../core/models/notification.model";
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';

export interface NotificationModel{
  message : string;
  type : string;
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
   notifications$ = new BehaviorSubject<NotificationModel>(null);
  
  public optionsToaster: Partial<IndividualConfig<any>>

  constructor(private toastr: ToastrService) {
    this.optionsToaster = this.toastr.toastrConfig;
    this.optionsToaster.positionClass = 'toast-bottom-right';
    this.optionsToaster.toastComponent = NotificationComponent
  }

  NotificationModel(message: string, type: number, options = {}) {
    const dataSnack: Notification = {
      'message': message,
      'type': type,
    }
    const toast = this.toastr.show(
      '',
      '',
      { ...this.optionsToaster }
    );

    toast.toastRef.componentInstance.data = dataSnack;

    setTimeout(() => {
      this.toastr.remove(toast.toastId)
    }, 3000);
  }

  Success(message: string) {
    this.notifications$.next({message: message , type: NotificationType.SUCSESS}); 
  }

  Info(message: string) {
    this.notifications$.next({message: message , type: NotificationType.INFO}); 
  }

  Error(message: string) {
    this.notifications$.next({message: message , type: NotificationType.ERROR}); 
  }

  Warning(message: string) {
    this.notifications$.next({message: message , type: NotificationType.WARNING}); 
  }


  notify(message: string) { 
    this.notifications$.next({message: message , type: 'Succsess'}); 
  }
}
