import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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
    private router: Router,
    public us: UserService
  ) {}

  /**
   * Asynchronously performs the login process.
   *
   * Validates the input fields (username and password), displaying errors if necessary.
   * Sends a request to the authentication service to log in with the provided username and password.
   * If successful, updates user data, sets the 'login_successful' flag to true, and navigates to the next page.
   * If there is an error during login, handles the error using the 'loginError' method.
   *
   * @param username - The username entered by the user.
   * @param password - The password entered by the user.
   */
  async login(username: string, password: string) {
    if (this.validateInputFields(username, password)) {
      try {
        const resp: any = await this.as.loginWithEmailAndPassword(
          username,
          password
        );
        this.us.selectedUser = null;
        this.loginResponse(resp);
      } catch (error: any) {
        this.loginError(error);
      }
    }
  }

  /**
   * Validates the input fields for a login attempt.
   *
   * Checks if the provided username and password are not empty after trimming.
   * If either is empty, sets corresponding error flags and returns false.
   * If both fields are non-empty, sets the 'formSubmitted' flag to true and returns true.
   *
   * @param username - The username entered by the user.
   * @param password - The password entered by the user.
   * @returns True if input fields are valid, otherwise false.
   */
  validateInputFields(username: string, password: string): boolean {
    if (username.trim() === '' || password.trim() === '') {
      this.showUsernameError = username.trim() === '';
      this.showPasswordError = password.trim() === '';
      return false;
    }
    this.formSubmitted = true;
    return true;
  }

  /**
   * Handles the response from the authentication service after a login attempt.
   *
   * Updates user data based on the response.
   * If the response includes a token, sets the 'login_successful' flag to true, stores the success message,
   * and navigates to the next page using 'navigateAfterLogin'.
   *
   * @param resp - The response object from the authentication service.
   */
  loginResponse(resp: any) {
    this.updateUserData(resp);
    if (resp.token) {
      this.login_successful = true;
      this.loginSuccessMessage = resp.success_message;
      this.navigateAfterLogin();
    }
  }

  /**
   * Updates user data in the application state based on the response received after login.
   * It sets the 'authToken' in 'us' service and updates 'userData' with various user information.
   * @param response - The response received after a successful login.
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
       pk: response.pk
    };

    localStorage.setItem('token', this.us.authToken);
    localStorage.setItem('userData', JSON.stringify(this.us.userData));
  }

  /**
   * Asynchronous method to navigate to '/join' route after a login.
   * It sets a timeout of 3000 milliseconds to delay the navigation.
   * Additionally, it updates the 'viewLoginPage' property in 'ViewSignupAndLoginService'
   * to true and triggers the loading of the summary.
   */
  navigateAfterLogin() {
    setTimeout(() => {
      this.us.isUserColorOpen = true;  /* diese muss ich noch ändern das das nur aufgerufen wird wenn usercolor nicht vergeben ist*/ 
      this.router.navigateByUrl('/summary');
    }, 3000);
  }

  /**
   * Checks and updates error flags for username and password based on form submission status.
   *
   * If the form has been submitted, checks if the username and password are empty after trimming,
   * and updates corresponding error flags accordingly.
   */
  checkInputs() {
    if (this.formSubmitted) {
      this.showUsernameError = this.username.trim() === '';
      this.showPasswordError = this.password.trim() === '';
    }
  }

  /**
   * Handles login errors by setting the 'login_unsuccessful' flag to true,
   * logging the error to the console, and updating the login error message.
   * If the error object contains a nested 'error' property, it uses that as the error message,
   * otherwise, it defaults to 'Unknown error'.
   * @param error - The error object received during login.
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
      console.error("Fehler beim Gast-Login:", error);
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