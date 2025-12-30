import { Component, ComponentFactory, ComponentRef } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  title = '';
  paragraphs: string[] = [];
  buttonLabelPrimary = '';
  buttonPrimary = () => {};
  buttonLabelSecondary = '';
  buttonSecondary = () => {};
  componentRef!: ComponentRef<DialogComponent>;

  primaryAction() {
    this.buttonPrimary();
    this.closeDialog();
  }

  secondaryAction() {
    this.buttonSecondary();
    this.closeDialog();
  }

  closeDialog() {
    this.componentRef?.destroy();
  }
}
