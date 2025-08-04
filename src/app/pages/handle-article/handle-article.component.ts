import { Component } from '@angular/core';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { SvgComponent } from '../../shared/components/svg/svg.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalErrorComponent } from '../../shared/components/modal-error/modal-error.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextareaEditorComponent } from '../../shared/components/textarea-editor/textarea-editor.component';

@Component({
  selector: 'app-handle-article',
  standalone: true,
  imports: [
    ProfileComponent,
    SvgComponent,
    RouterLink,
    RouterLinkActive,
    ModalErrorComponent,
    InputTextComponent,
    ButtonComponent,
    TextareaEditorComponent
  ],
  templateUrl: './handle-article.component.html',
  styleUrl: './handle-article.component.scss',
})
export class HandleArticleComponent {
  public handleImage() {
    let reader = new FileReader();
    // reader.onload = () => {
    //     setImage( reader.result )
    //     setValue('image', reader.result)
    // }
    // if(event.target.files) {
    //   try{
    //     reader.readAsDataURL(event.target.files[0]);
    //   } catch{

    //   }
  }
}
