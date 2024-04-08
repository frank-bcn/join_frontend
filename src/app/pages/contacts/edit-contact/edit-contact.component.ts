import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translate(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translate(0)' }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'translate(+100%)' })) 
      ])
    ])
  ]
})

export class EditContactComponent {

  constructor(public us: UserService) {}

  closeSliderEditContainer() {
    this.us.editContact = false;
  }
}
