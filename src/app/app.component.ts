import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ViewSignupAndLoginService } from './services/view-signup-and-login.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'join';
  activeLink: string = '';

  constructor(
    public vsal: ViewSignupAndLoginService,
    private router: Router,
    public as: AuthService,
    public us: UserService
  ) {}

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties
   * and checked the component's views and child views.
   * Checks if the 'loadSummary' property in the 'AuthService' is set to true,
   * and if so, triggers the loading of the summary.
   */
  ngOnInit() {
    this.setActiveLink();
  }

  /**
   * Method to set the active link to 'summary'.
   */
  setActiveLink() {
    this.activeLink = 'summary';
  }

  /**
   * Method to navigate to the '/summary' route and update the active link.
   */
  loadSummary() {
    this.router.navigateByUrl('/summary');
    this.activeLink = 'summary';
  }

  /**
   * Method to navigate to the '/board' route and update the active link.
   */
  loadBoard() {
    this.router.navigateByUrl('/board');
    this.activeLink = 'board';
  }

  /**
   * Method to navigate to the '/addTask' route and update the active link.
   */
  loadAddTask() {
    this.router.navigateByUrl('/addTask');
    this.activeLink = 'addTask';
  }

  /**
   * Method to navigate to the '/contacts' route and update the active link.
   */
  loadContacts() {
    this.router.navigateByUrl('/contacts');
    this.activeLink = 'contacts';
  }

  /**
   * Method to update the active link to 'legalNotice'.
   */
  loadLegalNotice() {
    this.activeLink = 'legalNotice';
  }
}