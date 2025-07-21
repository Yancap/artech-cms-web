import { take } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @Input() userData?: IUserData;
  @Input() direction: 'right' | 'left' = 'right';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.userData) {
      if (this.authService.userAccess['_buffer'].length === 0) {
        this.authService.getAccess().pipe(take(1)).subscribe();
      }
      this.authService.userAccess.subscribe((userData) => {
        this.userData = userData;
      });
    }
  }
}
