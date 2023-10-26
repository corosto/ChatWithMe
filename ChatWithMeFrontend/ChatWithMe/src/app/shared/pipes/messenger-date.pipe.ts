import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, format } from 'date-fns';
import { pl } from 'date-fns/locale';

@Pipe({
  name: 'messengerDate',
  standalone: true,
})
export class MessengerDatePipe implements PipeTransform {

  transform(date: Date | string): string {
    if (typeof date === 'string')
      date = new Date(date);

    const today = new Date();
    const differenceDays = differenceInDays(today, date);

    if (differenceDays === 0) {
      return `Dzisiaj, ${format(date, 'HH:mm')}`;
    } else if (differenceDays === 1) {
      return `Wczoraj, ${format(date, 'HH:mm')}`;
    }
    else if (differenceDays < 8) {
      return format(date, 'dd MMMM, HH:mm', { locale: pl });
    } else if (differenceDays < 31) {
      return "Ponad tydzień temu";
    } else {
      return "Ponad miesiąc temu";
    }
  }
}
