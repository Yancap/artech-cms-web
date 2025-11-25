import { CategoryService } from './../../shared/services/category/category.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TextareaEditorComponent } from '../../shared/components/textarea-editor/textarea-editor.component';
import { InputSelectComponent } from '../../shared/components/input-select/input-select.component';
import { Subject, take } from 'rxjs';
import { InputAddComponent } from '../../shared/components/input-add/input-add.component';
import { InputLinkComponent } from '../../shared/components/input-link/input-link.component';
import { ArticleState } from '../../shared/models/enums/article-state.enums';
import { InputImageComponent } from '../../shared/components/input-image/input-image.component';
import { ArticleService } from '../../shared/services/article/article.service';
import { ModalMessageService } from '../../shared/services/modal-message/modal-message.service';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';
import { TypeModal } from '../../shared/models/enums/type-modal.enums';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-handle-article',
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

  public isActivable = false;
  public resetForm = false;
  public isCreateRoute = true;
  public slug: string | null = null;
  public articleToEdit!: ArticleDTO;
  public userData!: IUserData;

  @ViewChild('containerModals', { read: ViewContainerRef, static: true })
  containerModalsRef!: ViewContainerRef;

  constructor(
    private authService: AuthService,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private modalMessageService: ModalMessageService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.authService.userAccess.subscribe((userData) => {
      this.userData = userData;
    });

    this.isCreateRoute =
      this.activatedRouter.routeConfig?.path === 'article/create';
    this.slug = this.activatedRouter.snapshot.paramMap.get('slug');

    console.log(this.articleForm.text);
    if (!this.isCreateRoute && this.slug) {
      this.articleService
        .getArticleBySlug(this.slug)
        .pipe(take(1))
        .subscribe((articleToEdit) => {
          this.articleForm = {
            ...articleToEdit,
            imageBlob: articleToEdit.imageUrl,
          };
          console.log(this.articleForm.text);
          this.cd.detectChanges();
        });
    }
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
      componentRef.instance.closeAction = modalData.closeAction;
      componentRef.instance.componentRef = componentRef;
      // componentRef.instance.closeModal = () => {
      //   if (modalData.closeAction) modalData.closeAction();
      //   componentRef.destroy();
      // };
    });
  }

  getValue(value: any, key: keyof ArticleFormDTO) {
    this.articleForm[key] = value;
    console.log(key);
    console.log(value);

    this.isActivable =
      this.articleForm.title !== '' &&
      this.articleForm.text !== '' &&
      this.articleForm.category !== '' &&
      this.articleForm.tags.length !== 0;
  }

  sendArticleDraft(event: Event) {
    event.preventDefault();

    this.articleForm.currentState = ArticleState.draft;
    this.articleService
      .createArticle(this.articleForm)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.articleForm = {
            title: '',
            subtitle: '',
            text: '',
            imageBlob: '',
            currentState: '',
            category: '',
            tags: [],
            credits: [],
          };
          this.modalMessageService.modalStack.next({
            message: `Rascunho criado com sucesso!`,
            details: '',
            scope: 'top',
            status: 201,
            type: TypeModal.SUCCESS,
          });
        },
      });
  }

  publishArticle(event: Event) {
    event.preventDefault();
    if (this.isCreateRoute) {
      this.articleService
        .createArticle(this.articleForm)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.articleForm = {
              title: '',
              subtitle: '',
              text: '',
              imageBlob: '',
              currentState: '',
              category: '',
              tags: [],
              credits: [],
            };
            this.modalMessageService.modalStack.next({
              message: `Artigo criado com sucesso!`,
              details: '',
              scope: 'top',
              status: 201,
              type: TypeModal.SUCCESS,
            });
          },
        });
    } else {
      this.articleService
        .editArticle(this.articleForm)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.articleForm = {
              title: '',
              subtitle: '',
              text: '',
              imageBlob: '',
              currentState: '',
              category: '',
              tags: [],
              credits: [],
            };
            this.modalMessageService.modalStack.next({
              message: `Artigo editado com sucesso!`,
              details: '',
              scope: 'top',
              status: 201,
              type: TypeModal.SUCCESS,
              closeAction: () => {
                this.router.navigateByUrl('articles/active');
              },
            });
          },
        });
    }
    this.articleForm.currentState = ArticleState.active;
  }

  resetForms() {
    this.articleForm = {
      title: '',
      subtitle: '',
      text: '',
      imageBlob: '',
      currentState: '',
      category: '',
      tags: [],
      credits: [],
    };
  }
}
