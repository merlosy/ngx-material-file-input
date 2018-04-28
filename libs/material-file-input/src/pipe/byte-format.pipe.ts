import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteFormat'
})
export class ByteFormatPipe implements PipeTransform {

  private readonly unit = 'Byte';

  transform(value: any, args?: any): any {
    if (!!value) {
      value = this.formatBytes(+value, +args);
    }
    return value;
  }

  private formatBytes(bytes: number, decimals?: number) {
    if (bytes === 0) { return '0 ' + this.unit };
    const B = this.unit.charAt(0);
    const k = 1024,
      dm = decimals || 2,
      sizes = [this.unit, 'K' + B, 'M' + B, 'G' + B, 'T' + B, 'P' + B, 'E' + B, 'Z' + B, 'Y' + B],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
