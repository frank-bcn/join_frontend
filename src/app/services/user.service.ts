import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HoverService } from './hover.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authToken: string = '';
  userData: any = {};
  users: any[] = [];
  userListEexternals: any[] = [];
  selectedUsers: any[] = [];
  userColors: string[] = [
    '#FFD700',
    '#98FB98',
    '#FFB6C1',
    '#87CEEB',
    '#FFA07A',
    '#FFDEAD',
    '#00FA9A',
    '#FF69B4',
    '#B0C4DE',
    '#FFFACD',
    '#FFE4C4',
    '#F0FFF0',
    '#D8BFD8',
    '#F0F8FF',
    '#FAFAD2',
    '#E6E6FA',
  ];
  switchBtnText: string = 'go to the externals';
  selectedUser: any = null;
  selectedColor: string = '';
  isUserColorOpen: boolean = false;
  isDropdownOpen: boolean = false;
  newContact: boolean = false;
  editContact: boolean = false;
  employees: boolean = false;
  username: string = '';
  email: string = '';
  phone: string = '';
  id: string = '';
  mobileScreen: boolean = false;
  editUser: boolean = false;
  newColors: boolean = false;

  constructor(
    public http: HttpClient,
    public router: Router,
    public hs: HoverService
  ) {}

  /**
   * Loads user data from the server and updates the 'users' array.
   * This function sends a GET request to the server to retrieve user data,
   * sorts the user data by username, and updates the 'users' array with the sorted data.
   * @throws Error if an error occurs during the data loading process.
   */
  async loadUsersFromServer() {
    let url = environment.baseUrl + '/api/users/';
    try {
      let response = await this.http.get<any[]>(url).toPromise();
      if (response) {
        this.users = this.sortUsersUsername(response);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Benutzer:', error);
      throw error;
    }
  }

  /**
   * Sorts an array of users by their usernames.
   * @param users An array of user objects to be sorted.
   * @returns A new array of user objects sorted by username.
   */
  sortUsersUsername(users: any[]): any[] {
    return users.sort((a, b) => {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    });
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
    let randomColor = this.randomColor();
    let body = this.userBody(randomColor);
    try {
      let response = await this.saveUser(url, body);
      this.saveUserResponse(response);
    } catch (error) {
      this.error(error);
    }
    this.newContact = false;
    this.externalsInitials(this.username);
  }

  /**
   * Constructs the request body for saving user data to the server.
   * This function returns an object containing the user's username, email, phone number, and a randomly generated color.
   * @param randomColor The randomly generated color for the user.
   * @returns An object representing the request body for saving user data.
   */
  userBody(randomColor: string): any {
    return {
      username: this.username,
      email: this.email,
      phone: this.phone,
      color: randomColor,
    };
  }

  /**
   * Sends a POST request to save user data to the server.
   * @param url The URL endpoint for saving user data.
   * @param body The request body containing user data to be saved.
   * @returns A promise that resolves with the response from the server after saving the user data.
   */
  async saveUser(url: string, body: any): Promise<any> {
    return this.http.post(url, body).toPromise();
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
   * Logs an error message to the console.
   * This function is used to handle errors that occur during asynchronous operations.
   * It logs the provided error object to the console for debugging purposes.
   * @param error The error object representing the error that occurred.
   */
  error(error: any): void {
    console.error('Error:', error);
  }

  /**
   * Generates a random color from a predefined list of colors.
   * This function calculates a random index within the range of the userColors array,
   * selects a color at that index, and returns the selected color.
   * @returns A randomly selected color from the userColors array.
   */
  randomColor(): string {
    let randomIndex = Math.floor(Math.random() * this.userColors.length);
    return this.userColors[randomIndex];
  }

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
   * Generates initials from the provided username.
   * This function splits the username into words, extracts the first letter of each word,
   * converts the letters to uppercase, and concatenates them to form the initials.
   * @param username The username from which initials are generated.
   * @returns The initials extracted from the username.
   */
  externalsInitials(username: string) {
    let names = username.split(' ');
    let initials = '';
    names.forEach((name) => {
      if (name.length > 0) {
        initials += name.charAt(0).toUpperCase();
      }
    });
    return initials;
  }

  /**
   * Generates initials from the provided username and last name.
   * This function extracts the first letter of the username and last name,
   * converts them to uppercase, and concatenates them to form the initials.
   * @param username The username from which the first initial is extracted.
   * @param lastName The last name from which the second initial is extracted.
   * @returns The initials extracted from the username and last name.
   */
  employeesInitials(username: string, lastName: string): string {
    return username.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }

  /**
   * Saves the selected color for the user to the server.
   * This function constructs the URL and request body for updating the user's color,
   * sends a request to the server to update the user's color,
   * and returns a promise representing the result of the operation.
   * @param selectedColor The selected color to be saved for the user.
   * @returns A promise that resolves with the response from the server after updating the user's color.
   */
  saveUserColor(selectedColor: string): Promise<any> {
    const url = environment.baseUrl + '/api/user/';
    const body = {
      pk: this.userData.pk,
      user_color: selectedColor,
    };
    return this.updateUserColor(url, body);
  }

  /**
   * Sends a PUT request to update the user's color on the server.
   * @param url The URL endpoint for updating the user's color.
   * @param body The request body containing the user's primary key and the selected color.
   * @returns A promise that resolves with the response from the server after updating the user's color.
   */
  async updateUserColor(url: string, body: any): Promise<any> {
    return this.http
      .put(url, body)
      .toPromise()
      .then((response) => {
        this.successResponse(response);
        return response;
      })
      .catch((error) => {
        this.error(error);
        throw error;
      });
  }

  /**
   * Handles the success response after updating the user's color.
   * This function logs the response for debugging purposes,
   * closes the user color selection interface,
   * and updates the user's color in the application state.
   * @param response The response object received after updating the user's color.
   */
  successResponse(response: any): void {
    console.log('Response:', response);
    this.isUserColorOpen = false;
    this.userData.user_color = this.selectedColor;
  }

  /**
   * Sorts an array of users into groups based on their usernames' initial letters.
   * This function iterates over the array of users, extracts the initial letter of each username,
   * groups users with the same initial letter together, and returns an array of grouped users.
   * @param users An array of users to be sorted.
   * @returns An array of grouped users, where each group represents users with the same initial letter.
   */
  sortUser(users: any[]): any[] {
    const groupedUsers: any[] = [];
    users.forEach((user) => {
      if (user.username) {
        let initial = user.username.charAt(0).toUpperCase();
        let existingGroup = groupedUsers.find(
          (group) => group.initial === initial
        );
        if (existingGroup) {
          existingGroup.users.push(user);
        } else {
          groupedUsers.push({ initial: initial, users: [user] });
        }
      }
    });
    return groupedUsers;
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
        .delete<any>(url, { body: { id: this.selectedUser.id } })
        .toPromise()
        .then(() => {
          this.selectedUser = null;
          this.loadUserListEexternals();
        })
        .catch((error) => {
          this.error(error);
        });
    }
  }

  /**
   * Changes the z-index property of HTML elements with specific IDs to control their stacking order.
   * This function takes a z-index value as input and applies it to the content and userList elements.
   * @param zIndex The z-index value to be applied to the elements.
   */
  changeZIndex(ZIndex: number) {
    const content = document.getElementById('content') as HTMLElement;
    const userList = document.getElementById('userList') as HTMLElement;

    if (content && userList) {
      content.style.zIndex = ZIndex.toString();
      userList.style.zIndex = (1 - ZIndex).toString();
    }
  }

  /**
   * Validates the required fields for editing a user.
   * Checks if the 'username', 'email', and 'phone' fields are not empty.
   * @param user The user object containing the fields to be validated.
   * @returns {boolean} Returns true if all required fields are present, otherwise false.
   */
  validateEditUserFields(user: any): boolean {
    if (!user.username || !user.email || !user.phone) {
      return false;
    }
    return true;
  }

  /**
   * Asynchronously edits the selected user's contact information.
   * Validates the user fields before making an HTTP POST request to update the user's information.
   * If successful, it hides the edit contact form and reloads the external user list.
   */
  async editUserContact() {
    if (!this.validateEditUserFields(this.selectedUser)) {
      return;
    }
    const { url, body } = this.updateContactRequestData();
    try {
      await this.http.post(url, body).toPromise();
      this.editContact = false;
      this.loadUserListEexternals();
    } catch (error) {
      this.error(error);
    }
  }

  /**
   * Constructs the URL and request body for updating a user's contact information.
   * @returns  The URL and request body.
   */
  updateContactRequestData() {
    const url = environment.baseUrl + '/api/updateContact/';
    const body = {
      username: this.selectedUser.username,
      email: this.selectedUser.email,
      phone: this.selectedUser.phone,
      id: this.selectedUser.id,
    };
    return { url, body };
  }

  /**
   * Sets the selected color.
   * It sets the 'selectedColor' property in the UserService to the specified color.
   * @param color The color to be selected.
   */
  selectColor(color: string) {
    this.selectedColor = color;
  }

  /**
   * Sets the selected color.
   * It sets the 'selectedColor' property in the UserService to the specified color.
   * @param color The color to be selected.
   */
  selectEditColor(color: string) {
    this.selectedColor = color;
    this.userData.usercolor = this.selectedColor;
  }

  async saveEditAccount() {
    const url = environment.baseUrl + '/api/userUpdate/';
    const body = {
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      email: this.userData.email,
      usercolor: this.userData.usercolor,
      id: this.userData.id,
    };
    try {
      await this.http.put(url, body).toPromise();
      this.updateUserData(body);
      this.editUser = false;
      this.newColors = false;
      this.isDropdownOpen = false;
    } catch (error) {}
  }

  updateUserData(body: any) {
    this.userData.firstName = body.firstName;
    this.userData.lastName = body.lastName;
    this.userData.email = body.email;
    this.userData.usercolor = body.usercolor;
    this.userData.id = body.id;

    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  edit() {
    this.editUser = true;
    console.log(this.editUser);
  }

  // muss noch erstellt werden, funktioniert nicht
  logout(): Observable<any> {
    console.log('click');
    const url = environment.baseUrl + '/logout/';
    return this.http.post(url, {});
  }
}
