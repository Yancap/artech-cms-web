import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ProfileComponent } from '../../shared/components/profile/profile.component';
import { InputTextComponent } from '../../shared/components/input-text/input-text.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AdminService } from '../../shared/services/admin/admin.service';
import { take } from 'rxjs';
import { TypeModal } from '../../shared/models/enums/type-modal.enums';
import { ModalMessageService } from '../../shared/services/modal-message/modal-message.service';
import { ModalMessageComponent } from '../../shared/components/modal-message/modal-message.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [ProfileComponent, InputTextComponent, ButtonComponent, 
    RouterLink],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.scss',
})
export class AddAuthorComponent implements OnInit {
  public createAuthorForm: ICreateAuthor = {
    name: '',
    email: '',
    password: '',
  };

  public confirmPassword = '';
  public isDisabled = true;

  constructor(
    private adminService: AdminService,
    private modalMessageService: ModalMessageService
  ) {}

  @ViewChild('containerModals', { read: ViewContainerRef, static: true })
  containerModalsRef!: ViewContainerRef;

  ngOnInit(): void {
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
    });
  }

  getValue(value: any, key: keyof ICreateAuthor) {
    this.createAuthorForm[key] = value;
    this.isDisabled = !(
      this.createAuthorForm.name !== '' &&
      this.createAuthorForm.email !== '' &&
      this.createAuthorForm.password !== '' &&
      this.confirmPassword === this.createAuthorForm.password
    );
  }

  setConfirmPassword(value: any) {
    this.confirmPassword = value;
    this.isDisabled = !(
      this.createAuthorForm.name !== '' &&
      this.createAuthorForm.email !== '' &&
      this.createAuthorForm.password !== '' &&
      this.confirmPassword === this.createAuthorForm.password
    );
  }

  addAuthor(event: Event) {
    event.preventDefault();
    this.adminService
      .createAuthor(this.createAuthorForm)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.modalMessageService.modalStack.next({
            message: `Autor adicionado com sucesso!`,
            details: '',
            scope: 'top',
            status: 201,
            type: TypeModal.SUCCESS,
          });
        },
      });
  }
}
