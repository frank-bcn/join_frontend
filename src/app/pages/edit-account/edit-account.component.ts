import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrl: './edit-account.component.scss',
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
export class EditAccountComponent {
  constructor(public us: UserService) {}

  /**
   * Closes the user edit form and any open dropdown menus.
   */
  close() {
    this.us.editUser = false;
    this.us.isDropdownOpen = false;
    this.us.newColors = false;
  }

  /**
   * Closes the color selection interface.
   */
  closeColors() {
    this.us.newColors = false;
  }

  /**
   * Opens the color selection interface and logs the current user data.
   */
  openEditColors() {
    this.us.newColors = true;
  }
}