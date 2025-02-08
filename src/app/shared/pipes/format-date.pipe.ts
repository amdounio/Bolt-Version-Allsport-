import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(dateString: string | undefined, showDay: boolean = false): string {
    if(!dateString){
      return '';
    }
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: showDay ? 'numeric' : undefined,
    };
    return date.toLocaleDateString(undefined, options);
  }
}
