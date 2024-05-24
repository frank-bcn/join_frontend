import { Injectable } from '@angular/core';
import { TaskService } from './task.service';
import { HoverService } from './hover.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserTaskService {
  constructor(
    public ts: TaskService,
    public router: Router,
    public hs: HoverService,
    public us: UserService
  ) {}

  /**
   * Navigates to the "addTask" route and performs additional actions related to adding a task.
   * This function navigates to the "addTask" route using the Angular router.
   * It also sets the active link in the navigation bar to "addTask".
   * Additionally, it checks if a user is selected and updates the checked status.
   */
  AddUserTask() {
    this.router.navigateByUrl('/addTask');
    this.hs.activeLink = 'addTask';
    this.checkUser(this.us.selectedUser);
    this.updateCheckedStatus();
  }

  /**
   * Updates the 'checked' status of users based on whether they are selected.
   * This function iterates over each user in the user list and checks if they are selected.
   * It sets the 'checked' property of each user to true if they are selected, and false otherwise.
   */
  updateCheckedStatus() {
    this.us.users.forEach((user) => {
      user.checked = this.us.selectedUsers.some(
        (selectedUser) => selectedUser.user_id === user.user_id
      );
    });
  }

   /**
   * Checks or unchecks a user in the list of selected users.
   * This function checks if the specified user is already in the list of selected users.
   * If the user is found in the list, it removes the user from the list (unchecks).
   * If the user is not found in the list, it adds the user to the list (checks).
   * @param user The user object to be checked or unchecked.
   */
   checkUser(user: any) {
    const userIndex = this.us.selectedUsers.findIndex(
      (selectedUser) => selectedUser.user_id === user.user_id
    );
    if (userIndex !== -1) {
      this.us.selectedUsers.splice(userIndex, 1);
    } else {
      this.us.selectedUsers.push(user);
    }
    console.log(this.us.selectedUsers);
  }
  
}
