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

  switchBtnText: string = 'go to the employees';

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

  constructor(public http: HttpClient, public router: Router, public hs: HoverService,) {}

  /**
   * Service method to fetch user data from the server.
   * Retrieves user data from the specified API endpoint and updates the service's users property.
   */
  async loadUsersFromServer() {
    const url = environment.baseUrl + '/api/users/';

    try {
      const response = await this.http.get<any[]>(url).toPromise();
      if (response) {
        this.users = this.sortUsersByUsername(response);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Benutzer:', error);
      throw error;
    }
  }

  /**
   * Sorts users by username in alphabetical order.
   * @param users The array of users to be sorted.
   * @returns The sorted array of users.
   */
  sortUsersByUsername(users: any[]): any[] {
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

  async saveUserToUserList() {
    const url = environment.baseUrl + '/api/saveEexternalsUser/';
    const randomColor = this.randomColor();
    const body = {
      username: this.username,
      email: this.email,
      phone: this.phone,
      color: randomColor,
    };
    console.log('Request Body:', body);

    try {
      const response = await this.http.post(url, body).toPromise();
      console.log('Response:', response);
      this.userListEexternals.push(response);
      this.loadUserListEexternals();
    } catch (error) {
      console.error('Error:', error);
    }
    this.newContact = false;
    console.log('Request Body:', body);
    this.externalsInitials(this.username);
  }

  async editUserContact() {
    const url = environment.baseUrl + '/api/updateContact/';
    const body = {
      username: this.selectedUser.username,
      email: this.selectedUser.email,
      phone: this.selectedUser.phone,
      id: this.selectedUser.id,
    };
    console.log('Body:', body);
    try {
      await this.http.post(url, body).toPromise();
      this.editContact = false;
      this.loadUserListEexternals();
      
    } catch (error) {
      
    }
  }

  randomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.userColors.length);
    return this.userColors[randomIndex];
  }

  async loadUserListEexternals() {
    const url = environment.baseUrl + '/api/loadUserListEexternals/';
    try {
      const response = await this.http.get<any[]>(url).toPromise();
      console.log('User List Eexternals:', response);
      this.userListEexternals = response as any[];
    } catch (error) {
      console.error('Error loading user list:', error);
    }
  }

  externalsInitials(username: string) {
    const names = username.split(' ');
    let initials = '';
    names.forEach((name) => {
      if (name.length > 0) {
        initials += name.charAt(0).toUpperCase();
      }
    });
    return initials;
  }

  employeesInitials(username: string, lastName: string): string {
    return username.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }


  saveUserColor() {
    const url = environment.baseUrl + '/api/update_user_color/';
    const body = {
      pk: this.userData.pk,
      user_color: this.selectedColor,
    };
    const user_color = this.http.put(url, body).toPromise();

    user_color
      .then((response) => {
        console.log('Response:', response);
        this.isUserColorOpen = false;
        this.userData.user_color = this.selectedColor;
        console.log(this.userData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return user_color;
  }

  sortUser(users: any[]): { [key: string]: any[] } {
    const groupedUsers: { [key: string]: any[] } = {};

    users.forEach((user) => {
      if (user.username) {
        const initial = user.username.charAt(0).toUpperCase();
        if (!groupedUsers[initial]) {
          groupedUsers[initial] = [];
        }
        groupedUsers[initial].push(user);
      }
    });

    return groupedUsers;
  }

  deleteContact(): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      const url = environment.baseUrl + '/api/delete/';
      this.http
        .delete<any>(url, { body: { id: this.selectedUser.id } })
        .toPromise()
        .then((response) => {
          console.log(response);
          this.selectedUser = null;
          this.loadUserListEexternals();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  

  logout(): Observable<any> {
    console.log('click');
    const url = environment.baseUrl + '/logout/';
    return this.http.post(url, {});
    
  }
}
