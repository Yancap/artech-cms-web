import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { ReplaySubject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  public article$: ReplaySubject<IArticleCommentsResponse> = new ReplaySubject();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getAllArticleComments(slug: string) {
    const token = this.tokenService.getUserToken();
    return this.http.get<IArticleCommentsResponse>(
      environment.apiUrl + `/comments/article/${slug}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).pipe(
      take(1),
      tap((article) => {
        this.article$.next(article);
      })
    );
  }

  deleteComment(commentId: number) {
    const token = this.tokenService.getUserToken();
    return this.http.delete<IArticleResponse>(
      environment.apiUrl + `/comments/${commentId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }


}
