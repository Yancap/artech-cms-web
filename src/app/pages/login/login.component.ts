import { Component } from '@angular/core';
import { InputTextComponent } from "../../shared/components/input-text/input-text.component";
import { ButtonComponent } from "../../shared/components/button/button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
