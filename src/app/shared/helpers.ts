import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(private currencyPipe: CurrencyPipe) {}

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'USD') || '';
  }

  formatDate(dateString: string, showDay: boolean = false): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: showDay ? 'numeric' : undefined, // Conditionally include day based on showDay
    };
    return date.toLocaleDateString(undefined, options);
  }
  
}
