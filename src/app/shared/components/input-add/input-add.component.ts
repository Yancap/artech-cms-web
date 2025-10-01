import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-add',
  standalone: true,
  imports: [FormsModule, SvgComponent],
  template: `
    <div [class]="'input-' + size + ' ' + style" #containerRef>
      <div class="container-content">
        <label [for]="label"> {{ label }}</label>
        <div class="container-input">
          <app-svg name="hashtag"  class="hashtag"/>
          <input
            type="text"
            placeholder="tag"
            (ngModelChange)="getValue($event)"
            [ngModel]="saveValue"
            id="inputRef"
          />
          <app-svg name="add" class="add" (click)="addNewValue()" />
        </div>
      </div>
      <div class="container-tag">
        @for (value of valueInput; track $index) {

        <span class="tag">
          #{{ value }}
          <app-svg name="plus" (click)="removeValue(value)" />
        </span>
        }
      </div>
    </div>
  `,
  styleUrl: './input-add.component.scss',
})
export class InputAddComponent {
  @Input() public label: string = '';
  @Input() public style: 'normal' | 'alternative' = 'normal';
  @Input() public size: 'sm' | 'md' | 'lg' = 'md';

  @Output() value: EventEmitter<string[]> = new EventEmitter();

  @ViewChild('containerRef')
  containerRef!: ElementRef<HTMLDivElement>;

  valueInput: string[] = [];
  saveValue: string = '';

  public addNewValue() {
    if (this.saveValue.length > 0) {
      this.valueInput.push(this.saveValue.replace(/[^a-zA-Z0-9]/g, ""));
      this.value.emit(this.valueInput);
      this.saveValue = '';
    }
  }
  public removeValue(value: string) {
    this.valueInput = this.valueInput.filter((valueArr) => valueArr !== value);
    this.value.emit(this.valueInput);
  }

  public getValue(value: string) {
    this.saveValue = value.toLowerCase();
  }
}
