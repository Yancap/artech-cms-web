import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgComponent } from '../svg/svg.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule, SvgComponent],
  template: `
    <div class="{{'input-' + size + ' ' + style + ' ' + (error ? 'error' : '')}}">
      @if(type === 'file') {
      <span>{{ label }}</span>
      <label [for]="label"> <app-svg name="add" /></label>
      <input
        [type]="type"
        [id]="label"
        [placeholder]="placeholder"
        (ngModelChange)="getValue($event)"
        [ngModel]="value"
      />
      } @if(type === 'password') {
      <label [for]="label"> {{ label }}</label>
      <div class="container-input">
        <input
          type="{{ toggleViewPassword ? 'text' : 'password' }}"
          [id]="label"
          [placeholder]="placeholder"
          (ngModelChange)="getValue($event)"
          [ngModel]="value"
        />
        <app-svg
          class="input-toggle"
          name="{{ toggleViewPassword ? 'eye-off' : 'eye' }}"
          (click)="setToggleViewPassword()"
        />
      </div>
      } @else {
      <label [for]="label"> {{ label }}</label>
      <input
        [type]="type"
        [id]="label"
        [placeholder]="placeholder"
        (ngModelChange)="getValue($event)"
        [ngModel]="value"
      />
      }
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
  @Input() public error: boolean = false;

  @Output() onChange: EventEmitter<string> = new EventEmitter();

  @Input() value!: string;

  toggleViewPassword = false;

  public setToggleViewPassword() {
    this.toggleViewPassword = !this.toggleViewPassword;
  }

  public getValue(event: string) {
    this.onChange.emit(event);
  }
}
