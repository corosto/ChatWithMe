import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderBender',
  standalone: true,
})
export class GenderPipe implements PipeTransform {
  transform(gender: 'female' | 'male' | 'other'): string {
    switch (gender) {
      case 'female':
        return 'Kobieta';
      case 'male':
        return 'Mężczyzna';
      case 'other':
        return 'Inna';
    }
  }
}
