import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert'
})
export class ConvertPipe implements PipeTransform {
  /**
   * Conver the the enter currency into ouput currency. To this operation use the exchange rate
   * @param value values of bitcoins to convert.
   * @param rate exchange rate beteen bitcoins and dollars,
   */
  transform(value: number, rate: number): number {
    return value * rate;
  }

}
