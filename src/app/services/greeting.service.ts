import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GreetingService {
  greeting: string = '';

  constructor() {}

  /**
   * Generates a greeting based on the current time of the day.
   * This function sets the 'greeting' property based on the current hour of the day.
   * If the current time is between 5:00 AM and 11:59 AM, it sets the greeting to 'Good morning!'.
   * If the current time is between 12:00 PM and 4:59 PM, it sets the greeting to 'Good afternoon!'.
   * Otherwise, it sets the greeting to 'Good evening!'.
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