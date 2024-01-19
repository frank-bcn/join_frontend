import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(public http: HttpClient) {}

  /**
  * Service method for user signup with username, first name, last name, email, and password.
  * @param username - The desired username for the new user.
  * @param first_name - The first name of the new user.
  * @param last_name - The last name of the new user.
  * @param email - The email address of the new user.
  * @param password - The desired password for the new user.
  * @returns An Observable for the signup request.
  */
  SignupWithNameAndEmailAndPassword(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    const url = environment.baseUrl + '/signup/';
    const body = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
  * Service method for user login with email and password.
  *
  * @param password - The password associated with the user's account.
  * @returns An Observable for the login request.
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