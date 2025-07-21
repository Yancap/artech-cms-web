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
    canMatch: [authGuard],
    children: [
      {
        component: ArticleActiveComponent,
        path: 'article/active',
        canMatch: [authGuard],
      },
      {
        component: ArticleDraftComponent,
        path: 'article/draft',
        canMatch: [authGuard],
      },
      {
        component: ArticleDisabledComponent,
        path: 'article/disabled',
        canMatch: [authGuard],
      },
      {
        component: ManageCommentsComponent,
        path: 'manage/comment',
        canMatch: [authGuard],
      },
      {
        component: AdminAuthorsComponent,
        path: 'admin/authors',
        canMatch: [authGuard, adminGuard],
      },
      {
        component: AdminArticlesComponent,
        path: 'admin/articles',
        canMatch: [authGuard, adminGuard],
      },
    ],
  },
];
