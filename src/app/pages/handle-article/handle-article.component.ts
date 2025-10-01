import { CategoryService } from './../../shared/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { SvgComponent } from '../../shared/components/svg/svg.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalErrorComponent } from '../../shared/components/modal-error/modal-error.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextareaEditorComponent } from '../../shared/components/textarea-editor/textarea-editor.component';
import { InputSelectComponent } from '../../shared/components/input-select/input-select.component';
import { take } from 'rxjs';
import { InputAddComponent } from '../../shared/components/input-add/input-add.component';
import { InputLinkComponent } from '../../shared/components/input-link/input-link.component';
import { ArticleState } from '../../shared/models/enums/article-state.enums';

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
    TextareaEditorComponent,
    InputSelectComponent,
    InputAddComponent,
    InputLinkComponent,
  ],
  templateUrl: './handle-article.component.html',
  styleUrl: './handle-article.component.scss',
})
export class HandleArticleComponent implements OnInit {
  public categoriesList!: string[];
  public articleForm: ArticleFormDTO = {
    title: '',
    subtitle: '',
    text: '',
    imageBlob: '',
    currentState: '',
    category: '',
    tags: [],
    credits: [],
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getAll()
      .pipe(take(1))
      .subscribe(({ categories }) => {
        this.categoriesList = categories;
      });
  }

  getValue(value: any, key: keyof ArticleFormDTO) {
    this.articleForm[key] = value;
  }

  sendArticleDraft(event: Event) {
    event.preventDefault();
    this.articleForm.currentState = ArticleState.draft;
    console.log(this.articleForm);
  }

  publishArticle(event: Event) {
    event.preventDefault();
    this.articleForm.currentState = ArticleState.active;
    console.log(this.articleForm);
  }

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
