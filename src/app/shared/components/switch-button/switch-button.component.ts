import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleState } from '../../models/enums/article-state.enums';

@Component({
  selector: 'app-switch-button',
  standalone: true,
  imports: [],
  template: `
    <div class="switch v2 {{state}}" (click)="action($event)">
      <button [class]="state" [disabled]=""></button>
    </div>
  `,
  styleUrl: './switch-button.component.scss',
})
export class SwitchButtonComponent {
  @Input() state: ArticleState = ArticleState.active;
  @Output() switch: EventEmitter<ArticleState> = new EventEmitter();

  public action(e: Event) {
    e.preventDefault();
    this.state =
      this.state === 'active'
        ? ArticleState.draft
        : this.state === 'draft'
        ? ArticleState.disabled
        : ArticleState.active;
    this.switch.emit(this.state);
  }
}
