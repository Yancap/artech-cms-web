import { DatePipe } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AdminService } from '../../../../shared/services/admin/admin.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-articles',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent, DatePipe],
  templateUrl: './admin-articles.component.html',
  styleUrl: './admin-articles.component.scss',
})
export class AdminArticlesComponent implements OnInit, AfterContentInit {
  public dataSource: IArticleForTable[] = [];
  public dataServer: IArticleForTable[] = [];

  constructor(
    private adminServices: AdminService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  deleteArticle(data: IArticleForTable) {
    this.adminServices
      .deleteArticle({ slug: data['slug'], email: data['authorEmail'] })
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  ngOnInit(): void {
    this.adminServices
      .getAllArticles()
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
    this.cd.detectChanges();
  }
}
