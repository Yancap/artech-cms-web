import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { TokenService } from '../token/token.service';
import { ArticleState } from '../../models/enums/article-state.enums';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  public getArticleByState(state: ArticleState) {
    const token = this.tokenService.getUserToken();
    return this.http.get(environment.apiUrl + `/article/${state}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
