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
   * Checks if "remember me" option is enabled and logs in with stored credentials if available.
   *
   * This function checks if the "remember me" option is enabled by checking the value of the
   * 'rememberMe' cookie. If the option is enabled, it retrieves the encoded username and password
   * from cookies and decodes them to log in with stored credentials.
   *
   * If both the encoded username and password are available and successfully decoded, it proceeds
   * to log in using the decoded credentials.
   */
  async checkRememberMe() {
    const rememberMeCookie = this.getCookie('rememberMe');
    if (rememberMeCookie === 'true') {
      const { encodedUsername, encodedPassword } = this.encodedCredentials();
      if (encodedUsername && encodedPassword) {
        const { username, password } = await this.decodeSetCredentials(
          encodedUsername,
          encodedPassword
        );
        await this.login(username, password);
      }
    }
  }

  /**
   * Retrieves and returns the encoded username and password from cookies.
   *
   * This function retrieves the encoded username and password from cookies using the
   * getCookie function and returns an object containing both values.
   *
   * @returns An object containing the encoded username and password retrieved from cookies.
   */
  encodedCredentials() {
    const encodedUsername = this.getCookie('username');
    const encodedPassword = this.getCookie('password');
    return { encodedUsername, encodedPassword };
  }

  /**
   * Asynchronously decodes and sets the username and password credentials.
   *
   * This function takes Base64 encoded username and password strings, decodes them asynchronously,
   * sets the decoded values to the corresponding properties of the object, and returns an object
   * containing the decoded username and password.
   *
   * @param encodedUsername - The Base64 encoded username to be decoded and set.
   * @param encodedPassword - The Base64 encoded password to be decoded and set.
   * @returns An object containing the decoded username and password.
   */
  async decodeSetCredentials(encodedUsername: string, encodedPassword: string) {
    const username = this.base64Decode(encodedUsername);
    const password = this.base64Decode(encodedPassword);
    this.username = username;
    this.password = password;
    return { username, password };
  }

  /**
   * Retrieves the value of a specified cookie.
   *
   * This function searches through the document's cookies to find a cookie with the given name.
   * If the cookie is found, its value is returned. If the cookie is not found, null is returned.
   *
   * @param name - The name of the cookie to be retrieved.
   * @returns The value of the cookie if found, otherwise null.
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
   * Handles the setting of "remember me" cookies.
   *
   * This function checks if the "remember me" option is enabled. If it is, it encodes the username
   * and password in Base64 format and sets cookies to store these encoded values along with the
   * "remember me" flag. The cookies are set to expire in 7 days.
   */
  rememberMeCookies() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    if (this.rememberMe) {
      const encodedUsername: string = this.base64Encode(this.username);
      const encodedPassword: string = this.base64Encode(this.password);
      console.log(encodedUsername, encodedPassword);
      this.setRememberMeCookies(encodedUsername, encodedPassword, expiryDate);
    }
  }

  /**
   * Sets cookies for "remember me" functionality.
   *
   * This function sets cookies for remembering the user's login credentials (username and password)
   * along with a "remember me" flag. Each cookie is set with an expiration date and path.
   *
   * @param encodedUsername - The Base64 encoded username to be stored in a cookie.
   * @param encodedPassword - The Base64 encoded password to be stored in a cookie.
   * @param expiryDate - The expiration date for the cookies.
   */
  setRememberMeCookies(
    encodedUsername: string,
    encodedPassword: string,
    expiryDate: Date
  ) {
    document.cookie = `rememberMe=true; expires=${expiryDate.toUTCString()}; path=/`;
    document.cookie = `username=${encodedUsername}; expires=${expiryDate.toUTCString()}; path=/`;
    document.cookie = `password=${encodedPassword}; expires=${expiryDate.toUTCString()}; path=/`;
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

  /**
   * Encodes a given string in Base64.
   *
   * This function takes an input string and converts it into a Base64 encoded string.
   * Base64 encoding is commonly used to represent binary data in a textual form,
   * especially in data transmission protocols such as email or URLs.
   *
   * @param data - The input string to be encoded in Base64.
   * @returns The Base64 encoded string.
   */
  base64Encode(data: string): string {
    return btoa(data);
  }

  /**
   * Decodes a given Base64 encoded string.
   *
   * This function takes a Base64 encoded input string and converts it back into its original string form.
   * Base64 decoding is commonly used to interpret data that was previously encoded in Base64 format.
   *
   * @param data - The Base64 encoded string to be decoded.
   * @returns The decoded original string.
   */
  base64Decode(data: string): string {
    return atob(data);
  }
}