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
import { ButtonComponent } from '../button/button.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input-link',
  standalone: true,
  imports: [FormsModule, SvgComponent, ButtonComponent],
  template: `
    <div [class]="'input-' + size + ' ' + style" #containerRef>
      <div class="container-label">
        <label [for]="label"> {{ label }}</label>
        <div class="container-form">
          <div class="container-span-input">
            <span> Nome </span>
            <div class="container-input">
              <app-svg name="text" class="text-svg" />
              <input
                type="text"
                placeholder="Fonte"
                (ngModelChange)="getValueName($event)"
                [ngModel]="saveValueName"
                id="inputRef"
              />
            </div>
          </div>
          <div class="container-span-input">
            <span> Link </span>
            <div class="container-input">
              <app-svg name="text" class="text-svg" />
              <input
                type="text"
                placeholder="https://www.link.com/"
                (ngModelChange)="getValueLink($event)"
                [ngModel]="saveValueLink"
                id="inputRef"
              />
            </div>
          </div>
          <app-button
            icon="add"
            size="md"
            [style]="'primary'"
            (click)="addNewValue($event)"
          />
        </div>
      </div>
      <div class="container-link">
        @for (value of value; track $index) {
        <span class="link">
          {{ value.name }}: <a>{{ value.link }}</a>
          <app-svg name="plus" (click)="removeValue(value)" />
        </span>
        }
      </div>
    </div>
  `,
  styleUrl: './input-link.component.scss',
})
export class InputLinkComponent {
  @Input() public label: string = '';
  @Input() public style: 'normal' | 'alternative' = 'normal';
  @Input() public size: 'sm' | 'md' | 'lg' = 'md';

  @Output() onChange: EventEmitter<{ name: string; link: string }[]> =
    new EventEmitter();

  @ViewChild('containerRef')
  containerRef!: ElementRef<HTMLDivElement>;

  @Input() value: { name: string; link: string }[] = [];
  saveValueName: string = '';
  saveValueLink: string = '';

  public addNewValue(event: Event) {
    event.preventDefault();
    this.value.push({
      name: this.saveValueName,
      link: this.saveValueLink,
    });

    this.onChange.emit(this.value);
    this.saveValueName = '';
    this.saveValueLink = '';
  }

  public removeValue(value: { name: string; link: string }) {
    this.value = this.value.filter((valueArr) => valueArr !== value);
    this.onChange.emit(this.value);
  }

  public getValueName(value: string) {
    this.saveValueName = value.toLowerCase();
  }

  public getValueLink(value: string) {
    this.saveValueLink = value.toLowerCase();
  }
}
