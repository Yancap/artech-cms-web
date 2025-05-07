import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [],
  template: `
    <div [class]="'input-' + size">
      <label for="">{{ label }}</label>
      <input [type]="type" [id]="label" [placeholder]="placeholder"/>
    </div>
  `,
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public type: string = 'text';
  @Input() public size: 'sm' | 'md' | 'lg' = 'md';
}
