import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [SvgComponent],
  template: `
    <button [disabled]="disabled" [class]="'btn-' + size + ' ' + style" >
      @if (icon) {
        <app-svg [name]="icon" />
      }
      <ng-content />
    </button>
  `,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() public label: string = '';
  @Input() public size: 'sm' | 'md' | 'lg' | 'xs' = 'md';
  @Input() public style:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'active'
    | 'error'
    | 'warning' = 'primary';
  @Input() public icon!: string;
  @Input() public disabled!: boolean;

}
