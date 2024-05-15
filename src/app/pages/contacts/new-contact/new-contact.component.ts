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

  /**
   * Closes the new contact container by setting the 'newContact' flag to false.
   * It hides the container used for adding a new contact.
   */
  closeNewContainer() {
    this.us.newContact = false;
  }

  /**
   * Validates the form fields and submits the form if all required fields are filled.
   * If any required field is empty (username, email, or phone), it logs a message indicating that all fields are required.
   * Otherwise, it submits the form.
   */
  validateForm() {
    if (!this.us.username || !this.us.email || !this.us.phone) {
      console.log('All fields are required');
      return;
    }
    this.onSubmit();
  }

  /**
   * Submits the form by saving the user to the user list and resetting the form.
   */
  onSubmit(): void {
    this.us.saveUserToUserList();
    this.resetForm();
  }

  /**
   * Resets the form by clearing the values of username, email, and phone fields.
   */
  resetForm(): void {
    this.us.username = '';
    this.us.email = '';
    this.us.phone = '';
  }
}