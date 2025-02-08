import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'lastLogin'
})
export class LastLoginPipe implements PipeTransform {

  constructor() {
  }

  transform(lastLogin: Date | undefined): string {
    if (!lastLogin) {
      return '';
    }

    const lastLoginDate = new Date(lastLogin);
    const currentDate = new Date();
    const diff = Math.abs(currentDate.getTime() - lastLoginDate.getTime());
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months >= 12) {
      return 'N/A';
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'A few seconds ago';
    }
  }
}
