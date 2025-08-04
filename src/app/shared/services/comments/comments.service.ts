import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllArticleComments(slug: string) {
    const token = this.tokenService.getUserToken();
    return this.http.get<IArticleResponse>(
      environment.apiUrl + `/comments/articles/${slug}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
