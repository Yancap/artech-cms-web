import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-add',
  standalone: true,
  imports: [FormsModule, SvgComponent],
  template: `
    <div [class]="'input-' + size + ' ' + style" #containerRef>
      <div class="container-content">
        <label [for]="label"> {{ label }}</label>
        <div class="container-input">
          <app-svg name="hashtag" class="hashtag" />
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
        @for (value of value; track $index) {

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

  @Output() onChange: EventEmitter<string[]> = new EventEmitter();

  @ViewChild('containerRef')
  containerRef!: ElementRef<HTMLDivElement>;

  @Input() value: string[] = [];
  saveValue: string = '';

  public addNewValue() {
    if (this.saveValue.length > 0) {
      this.value.push(this.saveValue.replace(/[^a-zA-Z0-9]/g, ''));
      this.onChange.emit(this.value);
      this.saveValue = '';
    }
  }
  public removeValue(value: string) {
    this.value = this.value.filter((valueArr) => valueArr !== value);
    this.onChange.emit(this.value);
  }

  public getValue(value: string) {
    this.saveValue = value.toLowerCase();
  }
}
