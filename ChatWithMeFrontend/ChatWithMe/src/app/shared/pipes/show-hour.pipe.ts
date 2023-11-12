import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes } from 'date-fns';

@Pipe({
  name: 'showHour',
  standalone: true,
})
export class ShowHourPipe implements PipeTransform {

  transform(currentMessageDate: Date, previousMessageDate: Date): boolean {
    if (differenceInMinutes(new Date(currentMessageDate), new Date(previousMessageDate)) >= 15)
      return true;
  }
}
