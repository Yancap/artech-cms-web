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
import { HandleArticleComponent } from './pages/handle-article/handle-article.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'article/active',
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
        path: 'article/active',
        canActivate: [authGuard],
      },
      {
        component: ArticleDraftComponent,
        path: 'article/draft',
        canActivate: [authGuard],
      },
      {
        component: ArticleDisabledComponent,
        path: 'article/disabled',
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
    component: HandleArticleComponent,
    path: 'article/:slug',
    canActivate: [authGuard]
  },
  {
    component: HandleArticleComponent,
    path: 'article',
    canActivate: [authGuard]
  },
];
