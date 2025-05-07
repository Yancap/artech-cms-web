import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticleActiveComponent } from './pages/home/routes/article-active/article-active.component';
import { ArticleDraftComponent } from './pages/home/routes/article-draft/article-draft.component';
import { ArticleDisabledComponent } from './pages/home/routes/article-disabled/article-disabled.component';
import { ManageCommentsComponent } from './pages/home/routes/manage-comments/manage-comments.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'article/active',
    pathMatch: 'prefix'
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: HomeComponent,
    path: '',
    children: [
      {
        component: ArticleActiveComponent,
        path: 'article/active',
      },
      {
        component: ArticleDraftComponent,
        path: 'article/draft',
      },
      {
        component: ArticleDisabledComponent,
        path: 'article/disabled',
      },
      {
        component: ManageCommentsComponent,
        path: 'manage/comment',
      },
    ]
  },
];
