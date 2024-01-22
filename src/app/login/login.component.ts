import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ViewSignupAndLoginService } from '../services/view-signup-and-login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  login_successful: boolean = false;
  login_unsuccessful = false;

  constructor(
    public as: AuthService,
    public vsal: ViewSignupAndLoginService,
    private router: Router,
    public us: UserService
  ) {}

  /**
   * Asynchronous method to navigate to '/join' route after a login.
   * It sets a timeout of 3000 milliseconds to delay the navigation.
   * Additionally, it updates the 'viewLoginPage' property in 'ViewSignupAndLoginService'
   * to true and triggers the loading of the summary.
   */
  async navigateAfterLogin() {
    setTimeout(() => {
      this.router.navigateByUrl('/summary');
      this.vsal.viewLoginPage = true;
      console.log(this.us.userData); 
    }, 3000);
  }

  /**
   * Asynchronous method to handle user login.
   * @param username The user's username
   * @param password The user's password
   */
  async login(username: string, password: string) {
    try {
      const response: any = await this.as.loginWithEmailAndPassword(username, password);
      this.us.authToken = response.token;
      this.us.userData = [
        { authToken: response.token },
        { username: response.username },
        { firstName: response.first_name },
        { lastName: response.last_name },
        { email: response.email }
      ];

      if (response.token) {
        this.login_successful = true;
        this.navigateAfterLogin();
      } else {
        this.login_unsuccessful = true;
      }
    } catch (error) {
      // Fehlerbehandlung
    }
  }

  /**
   * Navigation method to redirect to the signup page
   */
  signUp() {
    this.vsal.showLoginOrSingnup = false;
    this.router.navigateByUrl('/signup');
  }
}