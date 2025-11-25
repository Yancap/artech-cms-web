import { Component, EventEmitter, Input, LOCALE_ID, Output } from '@angular/core';
import { SvgComponent } from '../svg/svg.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CommentsService } from '../../services/comments/comments.service';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-container-comment',
  standalone: true,
  imports: [SvgComponent, DatePipe],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './container-comment.component.html',
  styleUrl: './container-comment.component.scss',
})
export class ContainerCommentComponent {
  @Input() comment!: CommentDTO;
  @Output() action: EventEmitter<any> = new EventEmitter();

  public slug!: string;

  constructor() {}

  handleClick(){
    this.action.emit();
  }

}
