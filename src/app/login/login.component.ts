import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private as: AuthService, private router: Router) {}
  /**
   * Navigation method to redirect to the signup page
   */
  signUp() {
    this.router.navigateByUrl('/signup');
  }

  /**
   * Method to handle user login
   * @param email The user's email address
   * @param password The user's password
   */
  async login(username: string, password: string) {
    try {
      let resp: any = await this.as.loginWithEmailAndPassword(username, password);
      localStorage.setItem('token', resp['token']);
      this.login_successful = true;
      setTimeout(() => {
        this.router.navigateByUrl('/join');
      }, 3000);
    } catch (error) {
      this.login_unsuccessful = true;
    }
  }
}
