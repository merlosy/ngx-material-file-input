import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-code-sample',
  templateUrl: './code-sample.component.html',
  styleUrls: ['./code-sample.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeSampleComponent {
  innerCode: string;

  @Input()
  set code(value: string) {
    this.innerCode = value;
  }
}
