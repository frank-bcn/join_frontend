import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  greeting: string = '';

  constructor() { }

  /**
 * Generates a greeting based on the current time of day.
 * Sets the 'greeting' property with a message appropriate for the time.
 */
  generateGreeting() {
    const currentTime = new Date().getHours();

    if (currentTime >= 5 && currentTime < 12) {
      this.greeting = 'Good morning!';
    } else if (currentTime >= 12 && currentTime < 17) {
      this.greeting = 'Good afternoon!';
    } else {
      this.greeting = 'Good evening!';
    }
  }
}