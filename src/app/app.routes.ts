import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticleActiveComponent } from './pages/home/routes/article-active/article-active.component';
import { ArticleDraftComponent } from './pages/home/routes/article-draft/article-draft.component';
import { ArticleDisabledComponent } from './pages/home/routes/article-disabled/article-disabled.component';
import { ManageCommentsComponent } from './pages/home/routes/manage-comments/manage-comments.component';
import { authGuard } from './shared/guards/auth/auth.guard';
import { AdminAuthorsComponent } from './pages/home/routes/admin-authors/admin-authors.component';
import { AdminArticlesComponent } from './pages/home/routes/admin-articles/admin-articles.component';
import { adminGuard } from './shared/guards/admin/admin.guard';
import { ArticleCommentsComponent } from './pages/article-comments/article-comments.component';
import { AddAuthorComponent } from './pages/add-author/add-author.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { saveArticleBeforeLeaveGuard } from './shared/guards/save-article-before-leave/save-article-before-leave.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'articles/active',
    pathMatch: 'prefix',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: HomeComponent,
    path: '',
    canActivate: [authGuard],
    children: [
      {
        component: ArticleActiveComponent,
        path: 'articles/active',
        canActivate: [authGuard],
      },
      {
        component: ArticleDraftComponent,
        path: 'articles/draft',
        canActivate: [authGuard],
      },
      {
        component: ArticleDisabledComponent,
        path: 'articles/disabled',
        canActivate: [authGuard],
      },
      {
        component: ManageCommentsComponent,
        path: 'manage/comment',
        canActivate: [authGuard],
      },
      {
        component: AdminAuthorsComponent,
        path: 'admin/authors',
        canActivate: [authGuard],
        canMatch: [adminGuard],
      },
      {
        component: AdminArticlesComponent,
        path: 'admin/articles',
        canActivate: [authGuard],
        canMatch: [adminGuard],
      },
    ],
  },
  {
    component: EditArticleComponent,
    path: 'article/:slug/edit',
    canActivate: [authGuard],
    canDeactivate: [saveArticleBeforeLeaveGuard]
  },
  {
    component: CreateArticleComponent,
    path: 'article/create',
    canActivate: [authGuard],
    canDeactivate: [saveArticleBeforeLeaveGuard]
  },
  {
    component: ArticleCommentsComponent,
    path: 'article/:slug/comments',
    canActivate: [authGuard],
  },
  {
    component: AddAuthorComponent,
    path: 'admin/add-author',
    canActivate: [authGuard],
    canMatch: [adminGuard],
  },
];
