import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { ArticleState } from '../../../../shared/models/enums/article-state.enums';
import { tap } from 'rxjs';
const mockDadosTabela = [
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 01, 2023',
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 02, 2023',
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 03, 2023',
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 04, 2023',
  },
  {
    title: 'Titulo do artigo sobre o Front-End e suas tecnologias',
    category: 'Front-end',
    createdAt: 'Jan 05, 2023',
  },
];
@Component({
  selector: 'app-article-draft',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent],
  templateUrl: './article-draft.component.html',
  styleUrl: './article-draft.component.scss',
})
export class ArticleDraftComponent implements OnInit, AfterContentInit {
  public dataSource: IArticleForTable[] = [];
  public dataServer: IArticleForTable[] = [];

  constructor(
    private articleService: ArticleService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }
  ngOnInit(): void {
    this.articleService
      .getArticleByState(ArticleState.draft)
      .pipe(
        tap((data) => {
          this.dataSource = data;
          this.dataServer = data;
        })
      )
      .subscribe();
  }
  onChangePage(tableDataOutput: any[]) {
    this.dataSource = tableDataOutput;
  }
}
