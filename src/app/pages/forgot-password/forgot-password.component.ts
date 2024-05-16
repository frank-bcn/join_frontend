import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string = '';
  notificationMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  forgotPassword() {

  
  }
 /**
   * Asynchronously sends an email by preparing form data and using the sendFormData function.
   * Handles loading state, form data creation, and error handling.
   */
//  async sendMail() {

//   let formData = this.createFormData(this.email);
//   try {
//     await this.sendFormData(formData);
    
//   } catch (error) {
 
//   }
// }

// /**
//  * Clears the form fields and hides the sent message.
//  * Resets the values of name, email, and message to empty strings.
//  */
// clearForm() {
//   this.email = '';
// }

// /**
//  * Creates and returns a FormData object by appending the user's name, email, and message to it.
//  * This function is responsible for constructing a FormData object that contains the form data to be sent to the server.
//  *
//  * @param name - The user's full name as a string.
//  * @param email - The user's email address as a string.
//  * @param message - The user's message as a string.
//  * @returns A FormData object with the appended form data.
//  */
// createFormData(email: string) {
//   let fd = new FormData();
//   fd.append('email', email);
//   return fd;
// }

// /**
//  * Sends the FormData object to a specified server endpoint using a POST request.
//  * This function is responsible for sending the form data to the server using the fetch API.
//  *
//  * @param formData - The FormData object containing the form data to be sent.
//  * @returns A promise that resolves when the POST request is completed.
//  */
// async sendFormData(formData: FormData) {
//   await fetch('https://frank-sinnigen.de/assets/send_mail/send_mail.php', {
//     method: 'POST',
//     body: formData,
//   });
// }
  /**
   * Function to navigate back to the login page
   */
  goBack() {
    this.router.navigateByUrl('/login');
  }
}