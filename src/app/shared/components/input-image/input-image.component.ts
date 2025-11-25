import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgComponent } from '../svg/svg.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-image',
  standalone: true,
  imports: [FormsModule, SvgComponent],
  template: `
    <div [class]="'input-' + size + ' ' + style + ' type-file'">
      <span>{{ label }}</span>
      <label [for]="label">
        @if (value) {
        <img [src]="value" />
        } @else {
        <app-svg name="add" />
        }
      </label>
      <input type="file" [id]="label" (change)="getValue($event)" />
    </div>
  `,
  styleUrl: './input-image.component.scss',
})
export class InputImageComponent {
  @Input() public label: string = '';
  @Input() public style: 'normal' | 'alternative' = 'normal';
  @Input() public size: 'sm' | 'md' | 'lg' = 'md';

  @Output() onChange: EventEmitter<string | ArrayBuffer | null> =
    new EventEmitter();

  @Input() value!: string | ArrayBuffer | null;

  public getValue(event: any) {
    let reader = new FileReader();
    reader.onload = () => {
      this.onChange.emit(reader.result);
      this.value = reader.result;
    };
    if (event.target?.files) {
      try {
        reader.readAsDataURL(event.target.files[0]);
      } catch {}
    }

    //this.value.emit(event);
  }
}
