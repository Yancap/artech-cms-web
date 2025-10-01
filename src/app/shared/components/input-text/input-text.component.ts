import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule, SvgComponent],
  template: `
    <div [class]="'input-' + size + ' ' + style + ' type-' + type">
      @if(type === 'file') {
        <span>{{ label }}</span>
        <label [for]="label"> <app-svg name="add" /></label>
      }@else {
      <label [for]="label"> {{ label }}</label>
      }
      <input
        [type]="type"
        [id]="label"
        [placeholder]="placeholder"
        (ngModelChange)="getValue($event)"
        [ngModel]="valueInput"
      />
    </div>
  `,
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  @Input() public label: string = '';
  @Input() public style: 'normal' | 'alternative' = 'normal';
  @Input() public placeholder: string = '';
  @Input() public type: string = 'text';
  @Input() public size: 'sm' | 'md' | 'lg' = 'md';

  @Output() value: EventEmitter<string> = new EventEmitter();

  valueInput!: string;

  public getValue(event: string) {
    this.value.emit(event);
  }
}
