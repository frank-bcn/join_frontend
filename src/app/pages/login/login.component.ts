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

  /**
   * Performs the login process.
   * It sets the 'formSubmitted' flag to true, validates the username and password fields,
   * attempts to log in with the provided credentials using the authentication service,
   * and handles the login response or error accordingly.
   */
  async login(username: string, password: string) {
    this.formSubmitted = true;
    if (!this.username.trim() || !this.password.trim()) {
      return;
    }
    try {
      const resp: any = await this.as.loginWithEmailAndPassword(
        this.username,
        this.password
      );
      this.us.loggedIn = true;
      this.us.selectedUser = null;
      this.loginResponse(resp);
    } catch (error: any) {
      this.loginError(error);
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
   * Toggles the "Remember Me" functionality.
   * If "Remember Me" is enabled, it sets a cookie with an expiry date 30 days from the current date.
   * If "Remember Me" is disabled, it removes the "rememberMe" cookie.
   */
  rememberMeClicked() {
    this.rememberMe = !this.rememberMe;
    if (this.rememberMe) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = `rememberMe=true; expires=${expiryDate.toUTCString()}; path=/`;
    } else {
      document.cookie =
        'rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
}
