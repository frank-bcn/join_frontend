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
   * Angular lifecycle hook called after the component has been initialized.
   * Subscribes to router events to update the active link when navigation ends.
   * It also restores user data, loads tasks, and sets the active link initially.
   */
  ngOnInit() {
    this.us.userData;
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

  /**
   * Restores user data from local storage if it exists.
   * It retrieves the stored user data from local storage and parses it into a JavaScript object.
   * If user data is found, it assigns it to the userData property of the UserService.
   */
  restoreUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.us.userData = JSON.parse(storedUserData);
    }
  }

  /**
   * Sets the active link based on the current route.
   * It retrieves the current route from the router and assigns the corresponding active link to the activeLink property of the HeaderService.
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
   * Navigates to the summary route and sets the active link to 'summary'.
   * It navigates to the '/summary' route using the router and sets the active link property of the HeaderService to 'summary'.
   */
  loadSummary() {
    this.router.navigateByUrl('/summary');
    this.hs.activeLink = 'summary';
  }

  /**
   * Navigates to the board route and sets the active link to 'board'.
   * It navigates to the '/board' route using the router and sets the active link property of the HeaderService to 'board'.
   */
  loadBoard() {
    this.router.navigateByUrl('/board');
    this.hs.activeLink = 'board';
  }

  /**
   * Navigates to the addTask route and sets the active link to 'addTask'.
   * It navigates to the '/addTask' route using the router and sets the active link property of the HeaderService to 'addTask'.
   */
  loadAddTask() {
    this.router.navigateByUrl('/addTask');
    this.hs.activeLink = 'addTask';
  }

  /**
   * Navigates to the contacts route and sets the active link to 'contacts'.
   * It navigates to the '/contacts' route using the router and sets the active link property of the HeaderService to 'contacts'.
   */
  loadContacts() {
    this.router.navigateByUrl('/contacts');
    this.hs.activeLink = 'contacts';
  }

  /**
   * Navigates to the legal-notice route and sets the active link to 'legalNotice'.
   * It sets the active link property of the HeaderService to 'legalNotice' and then navigates to the '/legal-notice' route using the router.
   */
  loadLegalNotice() {
    this.hs.activeLink = 'legalNotice';
    this.router.navigateByUrl('/legal-notice');
  }

  /**
   * Navigates to the help route.
   * It navigates to the '/help' route using the router.
   */
  loadHelpPage() {
    this.router.navigateByUrl('/help');
  }

  /**
   * Checks if the current route is a login-related page.
   * It returns true if the current route is '/login', '/signup', or '/forgot'; otherwise, it returns false.
   * @returns A boolean value indicating whether the current route is a login-related page.
   */
  isLoginPage() {
    return (
      this.router.url === '/login' ||
      this.router.url === '/signup' ||
      this.router.url === '/forgot'
    );
  }

  /**
   * Toggles the dropdown state.
   * It toggles the value of the 'isDropdownOpen' property in the UserService.
   * If 'isDropdownOpen' is true, it sets it to false; if it's false, it sets it to true.
   */
  toggleDropdown() {
    this.us.isDropdownOpen = !this.us.isDropdownOpen;
  }

  /**
   * Sets the user color panel to open.
   * It sets the 'isUserColorOpen' property in the UserService to true, indicating that the user color panel is open.
   */
  openUserColor() {
    this.us.isUserColorOpen = true;
  }

  /**
   * Closes the user color panel.
   * It sets the 'isUserColorOpen' property in the UserService to false, indicating that the user color panel is closed.
   * It also sets the 'isDropdownOpen' property in the UserService to false, indicating that the dropdown is closed.
   */
  closeUserColor() {
    this.us.isUserColorOpen = false;
    this.us.isDropdownOpen = false;
  }
  
}