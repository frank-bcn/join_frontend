import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewSignupAndLoginService {

  viewLoginPage = false;
  showLoginOrSingnup = true;

  constructor() { }
}
