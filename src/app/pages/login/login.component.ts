import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';

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
    public ts: TaskService
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
      this.ts.updateTaskDeadline25();
      this.ts.updateTaskDeadline26();
      this.ts.updateTaskDeadline27();
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
      this.us.isUserColorOpen =
        true; /* diese muss ich noch ändern das das nur aufgerufen wird wenn usercolor nicht vergeben ist*/
      this.router.navigateByUrl('/summary');
    }, 3000);
  }

  /**
   * Handles errors that occur during the login process.
   * @param error The error object representing the error.
   */
  loginError(error: any) {
    this.login_unsuccessful = true;
    console.error(error);
    this.loginErrorMessage = error.error ? error.error.error : 'Unknown error';
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

  rememberMeClicked() {}
}