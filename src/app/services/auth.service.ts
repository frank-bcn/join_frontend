import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  showLogin = false;

  constructor(public http: HttpClient, public us: UserService) {}

  /**
   * Sends a POST request to sign up a new user with the provided username, first name, last name, email, and password.
   * @param username The username of the new user.
   * @param first_name The first name of the new user.
   * @param last_name The last name of the new user.
   * @param email The email address of the new user.
   * @param password The password of the new user.
   * @returns An observable of the HTTP response from the signup request.
   */
  SignupWithNameAndEmailAndPassword(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    let url = environment.baseUrl + '/signup/';
    let body = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Sends a POST request to authenticate a user with the provided username and password.
   * @param username The username of the user attempting to log in.
   * @param password The password of the user attempting to log in.
   * @returns An observable of the HTTP response from the login request.
   */
  loginWithEmailAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: username,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }
}