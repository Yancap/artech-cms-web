import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ContainerCommentComponent } from '../../shared/components/container-comment/container-comment.component';
import { ArticleService } from '../../shared/services/article/article.service';
import { take } from 'rxjs';
import { CommentsService } from '../../shared/services/comments/comments.service';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-article-comments',
  standalone: true,
  imports: [
    ProfileComponent,
    ButtonComponent,
    ContainerCommentComponent,
    RouterLink,
  ],
  templateUrl: './article-comments.component.html',
  styleUrl: './article-comments.component.scss',
})
export class ArticleCommentsComponent implements OnInit {
  public slug: string = '';
  public article!: IArticleCommentsResponse;
  public userData!: IUserData;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private commentsService: CommentsService
  ) {}

  public ngOnInit(): void {
    this.authService.userAccess.subscribe((userData) => {
      this.userData = userData;
    });
    this.slug = this.activatedRouter.snapshot.paramMap.get('slug') as string;
    this.commentsService.getAllArticleComments(this.slug).subscribe();
    this.commentsService.article$.subscribe((article) => {
      this.article = article;
    });
  }

  public returnHome(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl('manage/comment');
  }

  public deleteComment(commentId: number) {
    
    this.commentsService
      .deleteComment(commentId)
      .pipe(take(1))
      .subscribe(() => {
        this.commentsService.getAllArticleComments(this.slug).subscribe();
      });
  }
}
