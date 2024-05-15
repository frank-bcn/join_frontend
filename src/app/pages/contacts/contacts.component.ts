import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
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
export class ContactsComponent {
  constructor(public us: UserService) {}

  /**
   * ngOnInit is an Angular lifecycle hook that is called after the component is initialized.
   * In this function, users are loaded from the server and the external user list is loaded.
   */
  ngOnInit() {
    this.us.loadUsersFromServer();
    this.us.loadUserListEexternals();
  }

  /**
   * Sets the flag to indicate that a new contact is being added.
   * It sets the 'newContact' flag in the 'us' service to true.
   */
  openNewContact() {
    this.us.newContact = true;
  }

  /**
   * Switches between displaying employees and externals in the user list.
   * It toggles the value of 'selectedUser' to null and updates the text of the switch button.
   */
  switchList() {
    this.us.selectedUser = null;
    this.us.switchBtnText =
      this.us.switchBtnText === 'go to the employees'
        ? 'go to the externals'
        : 'go to the employees';
  }

  /**
   * Opens the employee list and selects the specified user.
   * @param user The user to be selected.
   */
  openEmployees(user: any) {
    this.us.employees = true;
    this.us.selectedUser = null;
    setTimeout(() => {
      this.us.selectedUser = user;
      this.us.changeZIndex(1);
    }, 10);
  }
}