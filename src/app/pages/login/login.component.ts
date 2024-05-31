import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { UpdateTaskService } from '../../services/update-task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    this.hideMessages();
  }

  username: string = '';
  password: string = '';
  loginErrorMessage: string = '';
  loginSuccessMessage: string = '';
  showUsernameError: boolean = false;
  showPasswordError: boolean = false;
  formSubmitted = false;
  login_successful: boolean = false;
  login_unsuccessful = false;
  rememberMe: boolean = false;

  constructor(
    public as: AuthService,
    public router: Router,
    public us: UserService,
    public ts: TaskService,
    public uts: UpdateTaskService
  ) {}

  ngOnInit() {
    this.checkRememberMe();
  }

  /**
   * Checks if the "remember me" cookie is set, and automatically logs in the user if it is.
   * Retrieves the username and password from cookies and calls the login method with them.
   */
  async checkRememberMe() {
    const rememberMeCookie = this.getCookie('rememberMe');
    if (rememberMeCookie === 'true') {
      this.username = this.getCookie('username') || '';
      this.password = this.getCookie('password') || '';
      if (this.username && this.password) {
        await this.login(this.username, this.password);
      }
    }
  }

  /**
   * Retrieves the value of a cookie by its name.
   * @param name The name of the cookie to retrieve.
   * @returns The value of the cookie, or null if the cookie is not found.
   */
  getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  }

  /**
   * Logs in with the provided username and password.
   * @param username The username for the login attempt.
   * @param password The password for the login attempt.
   */
  async login(username: string, password: string) {
    this.formSubmitted = true;
    if (!this.username.trim() || !this.password.trim()) {
      return;
    }
    try {
      const resp: any = await this.attemptLogin(username, password);
      this.rememberMeCookies();
      this.successfulLogin(resp);
    } catch (error: any) {
      this.loginError(error);
    }
  }

  /**
   * Attempts to log in with the provided username and password.
   * @param username The username for the login attempt.
   * @param password The password for the login attempt.
   * @returns A promise that resolves with the login response.
   */
  async attemptLogin(username: string, password: string) {
    return await this.as.loginWithEmailAndPassword(username, password);
  }

  /**
   * Handles the successful login response.
   * @param resp The response from the login request.
   */
  successfulLogin(resp: any) {
    this.us.loggedIn = true;
    this.us.selectedUser = null;
    this.loginResponse(resp);
  }

  /**
   * Sets the "rememberMe", "username", and "password" cookies if the "rememberMe" option is checked.
   */
  rememberMeCookies() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    if (this.rememberMe) {
      document.cookie = `rememberMe=true; expires=${expiryDate.toUTCString()}; path=/`;
      document.cookie = `username=${
        this.username
      }; expires=${expiryDate.toUTCString()}; path=/`;
      document.cookie = `password=${
        this.password
      }; expires=${expiryDate.toUTCString()}; path=/`;
    }
  }

  /**
   * Handles the response after a login attempt.
   * @param resp The response object returned after attempting login.
   */
  loginResponse(resp: any) {
    this.updateUserData(resp);
    if (resp.token) {
      this.login_successful = true;
      this.loginSuccessMessage = resp.success_message;
      this.navigateAfterLogin();
      this.uts.updateTaskDeadline25();
      this.uts.updateTaskDeadline26();
      this.uts.updateTaskDeadline27();
    } else {
    }
  }

  /**
   * Updates the user data with the response from the login attempt.
   * @param response The response object containing user data.
   */
  updateUserData(response: any) {
    this.us.authToken = response.token;
    this.us.userData = {
      authToken: response.token,
      username: response.username,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      usercolor: response.user_color,
      id: response.id,
      pk: response.pk,
    };

    localStorage.setItem('token', this.us.authToken);
    localStorage.setItem('userData', JSON.stringify(this.us.userData));
  }

  /**
   * Navigates to the summary page after a delay.
   * This function also sets a flag to indicate that the user color selection should be open (needs to be updated to check if user color is not assigned yet).
   */
  navigateAfterLogin() {
    setTimeout(() => {
      this.us.isUserColorOpen = true;
      this.router.navigateByUrl('/summary');
    }, 3000);
  }

  /**
   * Handles errors that occur during the login process.
   * @param error The error object representing the error.
   */
  loginError(error: any) {
    this.login_unsuccessful = true;
    this.loginErrorMessage =
      'Login failed! Please check your credentials and try again.';
  }

  /**
   * Navigation method to redirect to the signup page
   */
  signUp() {
    this.router.navigateByUrl('/signup');
  }

  /**
   * Navigation method to redirect to the forgot page
   */
  forgotPassword() {
    this.router.navigateByUrl('/forgot');
  }

  /**
   * Asynchronous method to handle user Guest login.
   * @param username The user's username
   * @param password The user's password
   */
  async guestLogin() {
    try {
      this.username = 'Guest';
      this.password = 'GuestAccountJoin';

      await this.login(this.username, this.password);
    } catch (error) {
      console.error('Fehler beim Gast-Login:', error);
    }
  }

  /**
   * Method to hide login-related messages.
   * Resets flags for successful login, unsuccessful login, username error, and password error.
   */
  hideMessages(): void {
    this.login_successful = false;
    this.login_unsuccessful = false;
    this.showUsernameError = false;
    this.showPasswordError = false;
  }

  /**
   * Toggles the "remember me" option.
   */
  rememberMeClicked(): void {
    this.rememberMe = !this.rememberMe;
  }
}
