import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { ArticleState } from '../../../../shared/models/enums/article-state.enums';
import { map, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  editArticle(slug: string) {
    this.router.navigateByUrl(`/article/${slug}`)
  }

  createArticle() {
    this.router.navigateByUrl(`/article/`);
  }
  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.articleService
      .getArticleByState(ArticleState.active)
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
  onChangePage(tableDataOutput: any[]) {
    this.dataSource = tableDataOutput;
    this.cd.detectChanges();
  }
}
