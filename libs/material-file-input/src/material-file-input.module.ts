import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusMonitor } from '@angular/cdk/a11y';
import { FileInputComponent } from './file-input/file-input.component';
import { ByteFormatPipe } from './pipe/byte-format.pipe';
import { FileInputConfig } from './model/file-input-config.model';

@NgModule({
  declarations: [FileInputComponent, ByteFormatPipe],
  providers: [FocusMonitor],
  exports: [FileInputComponent, ByteFormatPipe]
})
export class MaterialFileInputModule {}
