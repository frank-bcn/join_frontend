import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { HoverService } from './hover.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authToken: string = '';
  userData: any = {};
  users: any[] = [];
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
  loggedIn: boolean = false;
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

  /**
   * Updates the user's account information on the server and updates the local state.
   */
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

  /**
   * Updates the local user data and persists it in local storage.
   *
   * @param body - The updated user data.
   */
  updateUserData(body: any) {
    this.userData.firstName = body.firstName;
    this.userData.lastName = body.lastName;
    this.userData.email = body.email;
    this.userData.usercolor = body.usercolor;
    this.userData.id = body.id;

    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  /**
   * Enables editing mode for the user's account details.
   */
  edit() {
    this.editUser = true;
  }

  async logout() {
    console.log('logout');
    const url = environment.baseUrl + '/logout/';
    this.userData = null;
    this.loggedIn = false;
    this.isDropdownOpen = false;
    await this.http.get(url).toPromise();
    this.router.navigate(['/login']);
}

}
