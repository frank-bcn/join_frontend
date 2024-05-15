import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    this.hideMessages();
  }

  formSubmitted: boolean = false;
  username: string = '';
  email: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  user_color: string = '';
  phone_number: string = '';
  registrationErrorMessage: string = '';
  registrationSuccessMessage: string = '';
  registration_successful: boolean = false;
  registration_unsuccessful: boolean = false;

  constructor(private router: Router, private as: AuthService) {}

  /**
   * Initiates the user signup process.
   * This function sets the 'formSubmitted' flag to true, validates the form fields (username, email, password),
   * creates user data from the form input, attempts to register the user with the provided data,
   * and handles the registration response or error accordingly.
   */
  async Signup() {
    this.formSubmitted = true;
    if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
      return;
    }
    try {
      let userData = this.createUserData();
      let resp: any = await this.registerUser(userData);
      this.successfulRegistration(resp);
    } catch (error: any) {
      this.failedRegistration(error);
    }
  }

  /**
   * Registers a user with the provided user data.
   * @param userData The user data object containing username, first name, last name, email, and password.
   * @returns A promise that resolves with the registration response.
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
   * Creates user data object from the input fields.
   * @returns An object containing user data such as username, first name, last name, email, password, user color, and phone number.
   */
  createUserData() {
    let username = this.createNames();
    let first_name = this.first_name;
    let last_name = this.last_name;
    let email = this.email;
    let password = this.password;

    return {
      username,
      first_name,
      last_name,
      email,
      password,
      user_color: this.user_color,
      phone_number: this.phone_number,
    };
  }

  /**
   * Handles the response after a successful user registration.
   * @param resp The response object returned after the user registration.
   */
  successfulRegistration(resp: any) {
    localStorage.setItem('token', resp['token']);
    this.registration_successful = true;
    this.registrationSuccessMessage = resp['message'];
    this.navigateToLoginAfterDelay();
  }

  /**
   * Handles errors that occur during the user registration process.
   * @param error The error object representing the error.
   */
  failedRegistration(error: any) {
    this.registration_unsuccessful = true;
    this.registrationErrorMessage = error.error
      ? error.error.error
      : 'Unknown error';
  }

  /**
   * Navigates to the login page after a delay.
   * This function sets a timeout to delay the navigation to the login page using the Angular Router.
   */
  navigateToLoginAfterDelay() {
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 3000);
  }

  /**
   * Parses the username to extract first and last names.
   * This function splits the username into an array of names,
   * sets the first name to the first element of the array,
   * sets the last name to the remaining elements joined by space,
   * and returns the first name.
   * @returns The first name extracted from the username.
   */
  createNames() {
    const names = this.username.split(' ');
    this.first_name = names[0] || '';
    this.last_name = names.slice(1).join(' ') || '';
    return this.first_name;
  }

  /**
   * Hides all registration-related messages.
   * This function resets flags related to successful and unsuccessful registration.
   * It sets these flags to false to hide any messages displayed to the user.
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