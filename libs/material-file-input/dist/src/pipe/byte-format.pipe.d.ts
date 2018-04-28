import { PipeTransform } from '@angular/core';
export declare class ByteFormatPipe implements PipeTransform {
    private readonly unit;
    transform(value: any, args?: any): any;
    private formatBytes(bytes, decimals?);
}
