import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { SvgComponent } from '../../shared/components/svg/svg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    ProfileComponent,
    SvgComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
