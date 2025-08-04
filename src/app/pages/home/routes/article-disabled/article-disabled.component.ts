import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { ArticleState } from '../../../../shared/models/enums/article-state.enums';
import { map, take, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
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
  selector: 'app-article-disabled',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent, DatePipe],
  templateUrl: './article-disabled.component.html',
  styleUrl: './article-disabled.component.scss',
})
export class ArticleDisabledComponent implements OnInit, AfterContentInit {
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
      .getArticleByState(ArticleState.disabled)
      .pipe(
        map(({ articlesList }) => {
          return articlesList.map((data) => ({
            slug: data.slug,
            title: data.title,
            category: data['category'],
            createdAt: data.createdAt,
          }));
        }),
        tap((data) => {
          this.dataSource = data;
          this.dataServer = data;
        })
      )
      .subscribe();
  }

  setStateToActive(slug: string) {
    this.articleService
      .changeArticleState(slug)
      .pipe(take(1))
      .subscribe(() => {
        this.ngOnInit();
      });
  }
  onChangePage(tableDataOutput: any[]) {
    this.dataSource = tableDataOutput;
    this.cd.detectChanges();
  }
}
