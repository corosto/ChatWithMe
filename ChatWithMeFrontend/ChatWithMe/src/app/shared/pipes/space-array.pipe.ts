import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceArray',
  standalone: true,
})
export class SpaceArrayPipe implements PipeTransform {
  transform(value: string | string[]): string {
    return Array.isArray(value) ? value.join(', ') : value;
  }
}
