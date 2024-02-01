import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authToken: string = '';
  userData: any[] = [];
  users: any[] = [];

  constructor(public http: HttpClient) {
    this.loadUserDataFromStorage();
  }

  /**
   * Service method to load user data from local storage.
   * Retrieves user data from local storage and updates the service's userData property.
   */
  loadUserDataFromStorage() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  /**
   * Service method to fetch user data from the server.
   * Retrieves user data from the specified API endpoint and updates the service's users property.
   */
  loadUsersFromServer() {
    const url = environment.baseUrl + '/api/users/';
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        this.users = response;
        console.log('Benutzerdaten geladen:', this.users);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Benutzer:', error);
      }
    });
  }
  
}
