import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { ArticleState } from '../../../../shared/models/enums/article-state.enums';
import { tap } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-active',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent, DatePipe],
  templateUrl: './article-active.component.html',
  styleUrl: './article-active.component.scss',
})
export class ArticleActiveComponent implements OnInit, AfterContentInit {
  public dataSource: IArticleForTable[] = [];
  public dataServer: IArticleForTable[] = [];

  constructor(
    private articleService: ArticleService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.articleService
      .getArticleByState(ArticleState.active)
      .pipe(
        tap((data) => {
          this.dataSource = data;
          this.dataServer = data;

          this.cd.detectChanges();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}
  onChangePage(tableDataOutput: any[]) {
    this.dataSource = tableDataOutput;
  }
}
