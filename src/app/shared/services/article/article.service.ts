import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { TokenService } from '../token/token.service';
import { ArticleState } from '../../models/enums/article-state.enums';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getArticleByState(state: ArticleState) {
    const token = this.tokenService.getUserToken();
    return this.http
      .get<IArticleResponse>(environment.apiUrl + `/article/${state}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map(({ articlesList }) => {
          return articlesList.map((data) => ({
            title: data.title,
            category: data['category'],
            createdAt: data.createdAt,
          }));
        })
      );
  }
}
