import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { environment } from '../../../../environment/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getAllArticles() {
    const token = this.tokenService.getUserToken();
    return this.http
      .get<IArticleResponse>(environment.apiUrl + `/admin/manage/articles`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map(({ articlesList }) => {
          return articlesList.map((data) => ({
            slug: data.slug,
            title: data.title,
            authorName: data.author.name,
            authorEmail: data.author.email,
            createdAt: data.createdAt,
          }));
        })
      );
  }

  public getAllAuthors() {
    const token = this.tokenService.getUserToken();
    return this.http
      .get<IAuthorResponse>(environment.apiUrl + `/admin/manage/author`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(map(({ authorsList }) => authorsList));
  }

  public createAuthor(request: ICreateAuthor) {
    const token = this.tokenService.getUserToken();
    return this.http.post<IAuthorResponse>(
      environment.apiUrl + `/admin/manage/author`,
      request,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  public deleteAuthor(email: string) {
    const token = this.tokenService.getUserToken();
    return this.http.delete<IAuthorResponse>(
      environment.apiUrl + `/admin/manage/author`,
      {
        headers: { Authorization: `Bearer ${token}` },
        body: { email },
      }
    );
  }

  public deleteArticle(data: { email: string; slug: string }) {
    const token = this.tokenService.getUserToken();
    return this.http.delete<IAuthorResponse>(
      environment.apiUrl + `/admin/manage/articles`,
      {
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      }
    );
  }
}
