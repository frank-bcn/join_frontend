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

  constructor(public us: UserService){}

  close() {
    this.us.editUser= false;
    this.us.isDropdownOpen=false;
  }

  closeColors() {
    this.us.newColors = false;
  }

  openEditColors() {
    this.us.newColors = true;
    console.log(this.us.userData);
  }
}
