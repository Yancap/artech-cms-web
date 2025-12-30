import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { TokenService } from '../token/token.service';
import { ArticleState } from '../../models/enums/article-state.enums';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { ArticleFormDTO } from '../../models/interfaces/IArticleForm';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  private readonly ENDPOINT = '/article/';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public getArticleByState(state: ArticleState) {
    const token = this.tokenService.getUserToken();
    return this.http.get<IArticleResponse>(
      environment.apiUrl + `${this.ENDPOINT}${state}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  public getArticleBySlug(slug: string) {
    const token = this.tokenService.getUserToken();
    return this.http.get<ArticleDTO>(
      environment.apiUrl + `${this.ENDPOINT}get/${slug}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  public changeArticleState(slug: string, state = ArticleState.active) {
    const token = this.tokenService.getUserToken();
    return this.http.patch<IArticleResponse>(
      environment.apiUrl + this.ENDPOINT,
      {
        state,
        slug,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  public deleteArticle(slug: string) {
    const token = this.tokenService.getUserToken();
    return this.http.delete<IArticleResponse>(
      environment.apiUrl + this.ENDPOINT + slug,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  public createArticle(article: ArticleFormDTO) {
    const token = this.tokenService.getUserToken();
    return this.http.post<IArticleResponse>(
      environment.apiUrl + this.ENDPOINT,
      article,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  public editArticle(article: ArticleFormDTO) {
    
    const token = this.tokenService.getUserToken();
    return this.http.put<IArticleResponse>(
      environment.apiUrl + this.ENDPOINT,
      article,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }


}
