import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
   /**
   * Host listener for document click events.
   * Calls the hideMessages method to hide registration-related messages.
   * @param {Event} event - The click event on the document.
   */
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    this.hideMessages();
  }

  username: string = '';
  email: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  registrationErrorMessage: string = '';
  registrationSuccessMessage: string = '';

  registration_successful: boolean = false;
  registration_unsuccessful: boolean = false;

  constructor(private router: Router, private as: AuthService) {}

  /**
 * Asynchronous method to initiate the user signup process.
 * It creates user data, registers the user, and handles success or failure accordingly.
 */
  async Signup() {
    try {
      const userData = this.createUserData();
      const resp: any = await this.registerUser(userData);

      this.successfulRegistration(resp);
    } catch (error: any) {
      this.failedRegistration(error);
    }
  }

  /**
 * Asynchronous method to register a user using provided user data.
 * @param {object} userData - User data object containing properties such as username, first_name, last_name, email, and password.
 * @returns {Promise<any>} A promise that resolves with the result of the user registration.
 */
  async registerUser(userData: any): Promise<any> {
    return await this.as.SignupWithNameAndEmailAndPassword(
      userData.username,
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password
    );
  }

 /**
 * Method to create user data object based on input properties.
 * @returns User data object containing properties such as username, first_name, last_name, email, and password.
 */
  createUserData() {
    const username = this.createNames();
    const first_name = this.first_name;
    const last_name = this.last_name;
    const email = this.email;
    const password = this.password;

    return { username, first_name, last_name, email, password };
  }

  /**
 * Method to handle a successful registration attempt.
 * @param {any} resp - The response object received from the registration attempt.
 */
  successfulRegistration(resp: any) {
    localStorage.setItem('token', resp['token']);
    this.registration_successful = true;
    this.registrationSuccessMessage = resp['message'];

    this.navigateToLoginAfterDelay();
  }

  /**
 * Method to handle a failed registration attempt.
 * @param {any} error - The error object received from the registration attempt.
 */
  failedRegistration(error: any) {
    this.registration_unsuccessful = true;
    this.registrationErrorMessage = error.error
      ? error.error.error
      : 'Unknown error';
  }

  /**
 * Method to navigate to the '/login' route after a delay of 3000 milliseconds (3 seconds).
 * Useful for scenarios like delayed redirects or displaying messages before navigating.
 */
  navigateToLoginAfterDelay() {
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000);
  }

  /**
   * Function to split username into first and last name
   */
  createNames() {
    const names = this.username.split(' ');
    this.first_name = names[0] || '';
    this.last_name = names.slice(1).join(' ') || '';
    return this.first_name;
  }

   /**
   * Method to hide registration-related messages.
   * Resets flags for successful and unsuccessful registration.
   */
   hideMessages(): void {
    this.registration_successful = false;
    this.registration_unsuccessful = false;
  }

  /**
   * Function to navigate back to the login page
   */
  goBack() {
    this.router.navigateByUrl('/login');
  }
}