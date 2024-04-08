import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translate(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translate(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'translate(+100%)' })),
      ]),
    ]),
  ],
})
export class NewContactComponent {

  constructor(public us: UserService) {}

  closeNewContainer() {
    this.us.newContact = false;
  }

  onSubmit(): void {
    this.us.saveUserToUserList();
    this.resetForm();
  }

  resetForm(): void {
    this.us.username = '';
    this.us.email = '';
    this.us.phone = '';
  }

}