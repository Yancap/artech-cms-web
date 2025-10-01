import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SvgComponent } from '../svg/svg.component';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [FormsModule, SvgComponent],
  template: `
    <div [class]="'input-' + size + ' ' + style" #containerRef>
      <div class="container-content">
        <label [for]="label"> {{ label }}</label>
        <div class="container-select">
          <div class="container-input">
            @if (toggleAddCategory) {
            <input
              type="text"
              placeholder="Nova categoria..."
              (ngModelChange)="getValue($event)"
              [ngModel]="valueInput"
              id="inputRef"
            />

            } @else {
            <div class="input-disabled" (click)="toggleOptions($event)">
              {{ valueInput }}
            </div>
            }
            <app-svg name="arrow-right" (click)="toggleOptions($event)" />
          </div>
          <ul class="select" #optionsRef>
            <li class="add-category" (click)="addNewCategory()">
              + Adicionar categoria
            </li>
            @for (item of options; track $index) {
            <li (click)="getValue(item)">{{ item }}</li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrl: './input-select.component.scss',
})
export class InputSelectComponent {
  @Input() public label: string = '';
  @Input() public style: 'normal' | 'alternative' = 'normal';
  @Input() public size: 'sm' | 'md' | 'lg' = 'md';
  @Input() public options: string[] = [];

  @Output() value: EventEmitter<string> = new EventEmitter();

  @ViewChild('optionsRef')
  optionsRef!: ElementRef<HTMLUListElement>;

  @ViewChild('containerRef')
  containerRef!: ElementRef<HTMLDivElement>;

  valueInput: string = '';
  toggleAddCategory: boolean = false;

  public toggleOptions(event: Event) {
    event.preventDefault();

    this.toggleAddCategory = false;
    if (this.optionsRef.nativeElement.classList.contains('open')) {
      this.optionsRef.nativeElement.classList.remove('open');
      this.containerRef.nativeElement.classList.remove('opened');
      return;
    }
    this.optionsRef.nativeElement.classList.add('open');
    this.containerRef.nativeElement.classList.add('opened');
  }

  public addNewCategory() {
    this.optionsRef.nativeElement.classList.remove('open');
    this.containerRef.nativeElement.classList.remove('opened');
    this.toggleAddCategory = true;
    setTimeout(() => {
      const inputRef = document.getElementById('inputRef') as HTMLInputElement;
      inputRef?.focus();
    }, 50);
  }

  public getValue(value: string) {
    if (!this.toggleAddCategory) {
      this.optionsRef.nativeElement.classList.remove('open');
      this.containerRef.nativeElement.classList.remove('opened');
    }

    this.valueInput = value;
    this.value.emit(value);
  }
}
