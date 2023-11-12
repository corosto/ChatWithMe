import { Pipe, PipeTransform } from '@angular/core';
import { differenceInCalendarDays, format } from 'date-fns';
import { pl } from 'date-fns/locale';

@Pipe({
  name: 'messengerDate',
  standalone: true,
})
export class MessengerDatePipe implements PipeTransform {

  transform(date: Date | string): string {
    if (!date)
      return '';

    if (typeof date === 'string')
    date = new Date(date);

    const today = new Date();
    const differenceDays = differenceInCalendarDays(today, date);

    if (differenceDays === 0)
      return `Dzisiaj, ${format(date, 'HH:mm')}`;
    else if (differenceDays === 1)
      return `Wczoraj, ${format(date, 'HH:mm')}`;
    else
      return format(date, 'dd MMMM, HH:mm', { locale: pl });
  }
}
