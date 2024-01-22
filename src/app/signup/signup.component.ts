import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ViewSignupAndLoginService } from '../services/view-signup-and-login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  registration_successful: boolean = false;
  registration_unsuccessful: boolean = false;

  constructor(
    private router: Router,
    private as: AuthService,
    public vsal: ViewSignupAndLoginService
  ) {}

  /**
  * Async function to handle user registration
  * Retrieves user data using createUserData
  * Calls the separate function registerUser to handle registration process
  * Stores token in local storage and displays success message
  * Redirects to the login page after 3 seconds
  * Handles errors during the process
  */
  async Signup() {
    try {
      const userData = this.createUserData();
      const resp: any = await this.registerUser(userData);

      localStorage.setItem('token', resp['token']);
      this.registration_successful = true;

      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 3000);
    } catch (error) {}
    this.registration_unsuccessful = true;
  }

  /**
  * Function to handle the registration process
  * Calls the service to register user and retrieve token
  * Returns the response
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
  * Function to create user data object from input values
  * Calls createNames to split the username into first and last name
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
  * Function to split username into first and last name
  */
  createNames() {
    const names = this.username.split(' ');
    this.first_name = names[0] || '';
    this.last_name = names.slice(1).join(' ') || '';
    console.log(this.last_name);
    return this.first_name;
  }

  /**
  * Function to navigate back to the login page
  */
  goBack() {
    this.vsal.showLoginOrSingnup = true;
    this.router.navigateByUrl('/login');
  }
}