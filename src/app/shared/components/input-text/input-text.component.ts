import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div [class]="'input-' + size">
      <label for="">{{ label }}</label>
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
  @Input() public placeholder: string = '';
  @Input() public type: string = 'text';
  @Input() public size: 'sm' | 'md' | 'lg' = 'md';

  @Output() value: EventEmitter<string> = new EventEmitter();

  valueInput!: string;

  public getValue(event: string) {
    console.log(event);

    this.value.emit(event);
  }
}
