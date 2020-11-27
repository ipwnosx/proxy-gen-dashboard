import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rrToRandom'
})
export class RrToRandomPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.toLowerCase() == 'rr') {
      return 'Random';
    }
    return value;
  }

}
