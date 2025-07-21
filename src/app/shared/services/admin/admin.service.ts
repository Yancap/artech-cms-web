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
            title: data.title,
            authorName: data.author.name,
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
}
