import { CategoryService } from './../../shared/services/category/category.service';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextareaEditorComponent } from '../../shared/components/textarea-editor/textarea-editor.component';
import { InputSelectComponent } from '../../shared/components/input-select/input-select.component';
import { ReplaySubject, take } from 'rxjs';
import { InputAddComponent } from '../../shared/components/input-add/input-add.component';
import { InputLinkComponent } from '../../shared/components/input-link/input-link.component';
import { ArticleState } from '../../shared/models/enums/article-state.enums';
import { InputImageComponent } from '../../shared/components/input-image/input-image.component';
import { ArticleService } from '../../shared/services/article/article.service';
import { ModalMessageService } from '../../shared/services/modal-message/modal-message.service';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';
import { TypeModal } from '../../shared/models/enums/type-modal.enums';
import { AuthService } from '../../shared/services/auth/auth.service';
import { SwitchButtonComponent } from '../../shared/components/switch-button/switch-button.component';
import { ArticleFormDTO } from '../../shared/models/interfaces/IArticleForm';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [
    ProfileComponent,
    RouterLink,
    InputTextComponent,
    ButtonComponent,
    TextareaEditorComponent,
    InputImageComponent,
    InputSelectComponent,
    InputAddComponent,
    InputLinkComponent,
    SwitchButtonComponent,
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent implements OnInit, ISaveArticleBeforeLeave {
  public categoriesList!: string[];
  public articleForm: ArticleFormDTO = {
    title: '',
    subtitle: '',
    text: '',
    imageBlob: '',
    imageUrl: '',
    currentState: ArticleState.active,
    category: '',
    tags: [],
    credits: [],
  };

  public isActivable = false;
  public resetForm = false;
  public slug: string | null = null;
  public articleToEdit!: ArticleDTO;
  public userData!: IUserData;

  @ViewChild('containerModals', { read: ViewContainerRef, static: true })
  containerModalsRef!: ViewContainerRef;

  @ViewChild('containerDialog', { read: ViewContainerRef, static: true })
  containerDialogRef!: ViewContainerRef;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private router: Router,
    private modalMessageService: ModalMessageService
  ) {}

  ngOnInit(): void {
    this.authService.userAccess.subscribe((userData) => {
      this.userData = userData;
    });

    this.categoryService
      .getAll()
      .pipe(take(1))
      .subscribe(({ categories }) => {
        this.categoriesList = categories;
      });

    this.modalMessageService.modalStack.subscribe((modalData) => {
      const componentRef = this.containerModalsRef.createComponent(
        ModalMessageComponent
      );
      componentRef.instance.details = modalData.details;
      componentRef.instance.message = modalData.message;
      componentRef.instance.scope = modalData.scope;
      componentRef.instance.status = modalData.status;
      componentRef.instance.type = modalData.type;
      componentRef.instance.componentRef = componentRef;
      componentRef.instance.closeModal = () => {
        if (modalData.type.toUpperCase() === 'SUCCESS') {
          this.router.navigateByUrl('/');
        }
        if (modalData.closeAction) modalData.closeAction();
        componentRef.destroy();
      };
    });
  }

  getValue(value: any, key: keyof ArticleFormDTO) {
    this.articleForm[key] = value;
    this.isActivable =
      this.articleForm.title !== '' &&
      this.articleForm.text !== '' &&
      this.articleForm.category !== '' &&
      this.articleForm.tags.length !== 0;
  }

  publishArticle(event: Event) {
    event.preventDefault();
    this.articleService
      .createArticle(this.articleForm)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isActivable = false;
          this.resetForms();
          this.modalMessageService.modalStack.next({
            message: `Artigo criado com sucesso!`,
            details: '',
            scope: 'top',
            status: 201,
            type: TypeModal.SUCCESS,
          });
        },
      });
  }

  resetForms() {
    this.articleForm = {
      title: '',
      subtitle: '',
      text: '',
      imageBlob: '',
      imageUrl: '',
      currentState: this.articleForm.currentState,
      category: '',
      tags: [],
      credits: [],
    };
  }

  generateDialogBeforeLeaveOfRoute() {
    const nextRoute: ReplaySubject<boolean> = new ReplaySubject(1);
    if (this.isActivable) {
      const componentRef =
        this.containerDialogRef.createComponent(DialogComponent);
      componentRef.instance.title = 'Deseja salvar o artigo como rascunho?';
      componentRef.instance.paragraphs = [
        'Caso você recuse, todo o seu trabalho será perdido.',
      ];
      componentRef.instance.buttonLabelPrimary = 'Salvar';
      componentRef.instance.buttonPrimary = () => {
        this.articleForm.currentState = ArticleState.draft;
        this.articleService
          .createArticle(this.articleForm)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.resetForms();
              this.modalMessageService.modalStack.next({
                message: `Artigo criado com sucesso!`,
                details: '',
                scope: 'top',
                status: 201,
                type: TypeModal.SUCCESS,
              });
              nextRoute.next(true);
            },
            error: () => {
              nextRoute.next(true);
            },
          });
      };
      componentRef.instance.buttonLabelSecondary = 'Recusar';
      componentRef.instance.buttonSecondary = () => {
        nextRoute.next(true);
      };
      componentRef.instance.componentRef = componentRef;
      return nextRoute;
    }
    nextRoute.next(true);
    return nextRoute;
  }
}
