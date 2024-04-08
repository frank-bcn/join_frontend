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
  switchBtnText: string = 'go to the employees';

  constructor(public us: UserService) {}

  ngOnInit() {
    this.us.loadUsersFromServer();
    this.us.loadUserListEexternals();
    console.log(this.us.userListEexternals);
  }

  openNewContact() {
    this.us.newContact = true;
  }

  switchList() {
    this.switchBtnText =
      this.switchBtnText === 'go to the employees'
        ? 'go to the externals'
        : 'go to the employees';
  }

  openEmployees(user: any) {
    this.us.employees = true;
    this.us.selectedUser = null;
    setTimeout(() => {
      this.us.selectedUser = user;
    }, 10);
  }
}
