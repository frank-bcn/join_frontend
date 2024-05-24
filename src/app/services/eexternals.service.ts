import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class EexternalsService {
  userListEexternals: any[] = [];

  constructor(public http: HttpClient, public us: UserService) {}

  /**
   * Loads the user list of externals from the server.
   * This function sends a GET request to the server to retrieve the user list of externals,
   * updates the 'userListEexternals' array with the retrieved data,
   * and logs the response for debugging purposes.
   */
  async loadUserListEexternals() {
    let url = environment.baseUrl + '/api/eexternalsUser/';
    try {
      let response = await this.http.get<any[]>(url).toPromise();
      this.userListEexternals = response as any[];
    } catch (error) {
      console.error('Error loading user list:', error);
    }
  }

  /**
   * Handles the response after successfully saving user data to the server.
   * This function adds the response data to the 'userListEexternals' array
   * and reloads the user list from the server to reflect the changes.
   * @param response The response object returned after saving user data.
   */
  saveUserResponse(response: any): void {
    this.userListEexternals.push(response);
    this.loadUserListEexternals();
  }

  /**
   * Deletes the selected contact from the server.
   * This function prompts the user for confirmation before initiating the deletion process.
   * If the user confirms the deletion, it sends a DELETE request to the server to delete the contact with the specified ID.
   * After successful deletion, it resets the selected user to null and reloads the user list of externals.
   * If any errors occur during the deletion process, they are logged to the console.
   */
  deleteContact(): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      const url = environment.baseUrl + '/api/eexternalsUser/';
      this.http
        .delete<any>(url, { body: { id: this.us.selectedUser.id } })
        .toPromise()
        .then(() => {
          this.us.selectedUser = null;
          this.loadUserListEexternals();
        })
        .catch((error) => {
          this.us.error(error);
        });
    }
  }

  /**
   * Asynchronously edits the selected user's contact information.
   * Validates the user fields before making an HTTP POST request to update the user's information.
   * If successful, it hides the edit contact form and reloads the external user list.
   */
  async editUserContact() {
    if (!this.us.validateEditUserFields(this.us.selectedUser)) {
      return;
    }
    const { url, body } = this.us.updateContactRequestData();
    try {
      await this.http.post(url, body).toPromise();
      this.us.editContact = false;
      this.loadUserListEexternals();
    } catch (error) {
      this.us.error(error);
    }
  }

    /**
   * Saves the user to the user list on the server.
   * This function constructs the URL and request body for saving the user,
   * sends a request to the server to save the user data,
   * and handles the response or error accordingly.
   * Finally, it resets the 'newContact' flag and updates the user's initials.
   */
    async saveUserToUserList() {
      let url = environment.baseUrl + '/api/eexternalsUser/';
      let randomColor = this.us.randomColor();
      let body = this.us.userBody(randomColor);
      try {
        let response = await this.us.saveUser(url, body);
        this.saveUserResponse(response);
      } catch (error) {
        this.us.error(error);
      }
      this.us.newContact = false;
      this.us.externalsInitials(this.us.username);
    }
}
