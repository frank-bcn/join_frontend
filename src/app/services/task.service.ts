import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HoverService } from './hover.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  clickUrgent = true;
  clickMedium = true;
  clickLow = true;

  constructor(
    public us: UserService,
    public router: Router,
    public hs: HoverService
  ) {}

  AddUserTask() {
    this.router.navigateByUrl('/addTask');
    this.hs.activeLink = 'addTask';
    this.checkUser(this.us.selectedUser);
    this.updateCheckedStatus();
  }

  updateCheckedStatus() {
    this.us.users.forEach((user) => {
      user.checked = this.us.selectedUsers.some(
        (selectedUser) => selectedUser.user_id === user.user_id
      );
    });
  }

  checkUser(user: any) {
    const userIndex = this.us.selectedUsers.findIndex(
      (selectedUser) => selectedUser.user_id === user.user_id
    );

    if (userIndex !== -1) {
      this.us.selectedUsers.splice(userIndex, 1);
      console.log('Benutzer entfernt:', user);
    } else {
      this.us.selectedUsers.push(user);
      console.log('Benutzer hinzugefügt:', user);
    }

    console.log(this.us.selectedUsers);
  }
}
