import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authToken: string = '';
  userData: any = {};
  users: any[] = [];
  userListEexternals: any[] = [];

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

  selectedUser: any = null;
  selectedColor: string = '';
  isUserColorOpen: boolean = false;
  isDropdownOpen: boolean = false;

  newContact: boolean = false;
  editContact: boolean = false;
  employees: boolean = false;

  username: string ='';
  email: string ='';
  phone: string ='';


  constructor(public http: HttpClient) { }

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

  saveUserToUserList() {
    const url = environment.baseUrl + '/api/savEexternalsUser/';
    const body = {
      username: this.username,
      email: this.email,
      phone: this.phone,
    };
  
    console.log('Request Body:', body);
  
    this.http.post(url, body).toPromise()
      .then(response => {
        console.log('Response:', response);
        this.userListEexternals.push(response);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  loadUserListEexternals() {
    const url = environment.baseUrl + '/api/loadUserListEexternals/';
    this.http.get<any[]>(url).toPromise()
      .then(response => {
        console.log('User List Eexternals:', response);
        this.userListEexternals = response as any[];
      })
      .catch(error => {
        console.error('Error loading user list:', error);
      });
  }
  


  saveUserColor() { 
    const url = environment.baseUrl + '/api/update_user_color/';
    const body = {
      pk: this.userData.pk,
      user_color: this.selectedColor
    };
    const user_color = this.http.put(url, body).toPromise();
    
    user_color.then(response => {
      console.log("Response:", response);
      this.isUserColorOpen = false;
      this.userData.user_color = this.selectedColor;
      console.log(this.userData);
    }).catch(error => {
      console.error("Error:", error);
    });
  
    return user_color;
  }
  
  sortUserByInitial(users: any[]): { [key: string]: any[] } {
    const groupedUsers: { [key: string]: any[] } = {};
  
    users.forEach(user => {
      const initial = user.username.charAt(0).toUpperCase();
      if (!groupedUsers[initial]) {
        groupedUsers[initial] = [];
      }
      groupedUsers[initial].push(user);
    });
  
    return groupedUsers;
  }
  
  
  logout() {
    const url = environment.baseUrl + '/logout/';
    return this.http.post(url, {});
  }
}