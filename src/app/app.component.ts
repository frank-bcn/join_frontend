import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HoverService } from './services/hover.service';
import { GreetingService } from './services/greeting.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'join';
  greeting: string = '';

  constructor(
    public router: Router,
    public as: AuthService,
    public us: UserService,
    public hs: HoverService,
    public gt: GreetingService,
    public ts: TaskService
  ) {
    console.log(
      '%c  Fränk rules!',
      'font-size:20px; font-weight:800; color:red; text-shadow: 5px 5px 10px green'
    );
  }

  /**
 * Lifecycle hook that is called after Angular has initialized all data-bound properties
 * and checked the component's views and child views.
 * Subscribes to the 'NavigationEnd' event of the 'Router' to detect route changes,
 * and triggers the 'setActiveLink' method to update the active link based on the current route.
 */
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (localStorage.getItem('token')) {
          this.setActiveLink();
        }
      });
    this.setActiveLink();
    this.restoreUserData();
    this.ts.loadTasks();
  }

  restoreUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.us.userData = JSON.parse(storedUserData);
    }
  }
  
  /**
   * Method to set the active link based on the current route.
   */
  setActiveLink() {
    const currentRoute = this.router.url;
    if (currentRoute === '/summary') {
      this.hs.activeLink = 'summary';
    } else if (currentRoute === '/board') {
      this.hs.activeLink = 'board';
    } else if (currentRoute === '/addTask') {
      this.hs.activeLink = 'addTask';
    } else if (currentRoute === '/contacts') {
      this.hs.activeLink = 'contacts';
    } else {
      this.hs.activeLink = '';
    }
  }

  /**
   * Method to navigate to the '/summary' route and update the active link.
   */
  loadSummary() {
    this.router.navigateByUrl('/summary');
    this.hs.activeLink = 'summary';
  }

  /**
   * Method to navigate to the '/board' route and update the active link.
   */
  loadBoard() {
    this.router.navigateByUrl('/board');
    this.hs.activeLink = 'board';
  }

  /**
   * Method to navigate to the '/addTask' route and update the active link.
   */
  loadAddTask() {
    this.router.navigateByUrl('/addTask');
    this.hs.activeLink = 'addTask';
  }

  /**
   * Method to navigate to the '/contacts' route and update the active link.
   */
  loadContacts() {
    this.router.navigateByUrl('/contacts');
    this.hs.activeLink = 'contacts';
  }

  /**
   * Method to update the active link to 'legalNotice'.
   */
  loadLegalNotice() {
    this.hs.activeLink = 'legalNotice';
    this.router.navigateByUrl('/legal-notice');
  }

  /**
   * Method to navigate to the '/help' route 
   */
  loadHelpPage() {
    this.router.navigateByUrl('/help');
  }

  /**
   * Method to check if the current route corresponds to a login-related page.
  * @returns True if the current route is '/login', '/signup', or '/forgot'; otherwise, false.
   */
  isLoginPage() {
    return this.router.url === '/login' || this.router.url === '/signup'|| this.router.url === '/forgot';
  }

  toggleDropdown() {
    this.us.isDropdownOpen = !this.us.isDropdownOpen;
  }

  openUserColor() {
    this.us.isUserColorOpen = true;
  }

  closeUserColor() {
    this.us.isUserColorOpen = false;
    this.us.isDropdownOpen = false;
  }

  selectColor(color: string) {
    this.us.selectedColor = color;
  }
}