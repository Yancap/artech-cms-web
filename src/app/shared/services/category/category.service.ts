import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}

    public getAll() {
      const token = this.tokenService.getUserToken();
      return this.http.get<ICategoryResponse>(
        environment.apiUrl + `/category/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
}
