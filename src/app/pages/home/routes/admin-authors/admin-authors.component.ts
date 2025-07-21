import { AfterContentInit, ChangeDetectorRef, Component } from '@angular/core';
import { tap } from 'rxjs';
import { AdminService } from '../../../../shared/services/admin/admin.service';
import { DatePipe } from '@angular/common';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ProfileComponent } from '../../../../shared/components/profile/profile.component';

@Component({
  selector: 'app-admin-authors',
  standalone: true,
  imports: [ButtonComponent, PaginatorComponent, DatePipe, ProfileComponent],
  templateUrl: './admin-authors.component.html',
  styleUrl: './admin-authors.component.scss',
})
export class AdminAuthorsComponent implements AfterContentInit {
  public dataSource: AuthorDTO[] = [];
  public dataServer: AuthorDTO[] = [];

  constructor(
    private adminServices: AdminService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.adminServices
      .getAllAuthors()
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
