import { AfterContentInit, ChangeDetectorRef, Component } from '@angular/core';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { ArticleState } from '../../../../shared/models/enums/article-state.enums';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-comments',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent],
  templateUrl: './manage-comments.component.html',
  styleUrl: './manage-comments.component.scss',
})
export class ManageCommentsComponent {
  public dataSource: {
    title: string;
    articleSlug: string;
    category: string;
    commentsLength: number;
  }[] = [];
  public dataServer: {
    title: string;
    articleSlug: string;
    category: string;
    commentsLength: number;
  }[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.articleService
      .getArticleByState(ArticleState.active)
      .pipe(
        map(({ articlesList }) => {
          return articlesList.map((data) => ({
            title: data.title,
            articleSlug: data.slug,
            category: data.category,
            commentsLength: data.comments.length,
          }));
        }),
        tap((data) => {
          this.dataSource = data;
          this.dataServer = data;
        })
      )
      .subscribe();
  }

  viewComment(articleSlug: string) {
    this.router.navigateByUrl(`/article/${articleSlug}/comments`);
  }

  onChangePage(tableDataOutput: any[]) {
    this.dataSource = tableDataOutput;
    this.cd.detectChanges();
  }
}
