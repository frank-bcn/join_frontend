import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.scss'
})
export class HelpPageComponent {


  constructor(private router: Router) {}

  /**
  * Function to navigate back to the login page
  */
  goBack() {
    this.router.navigateByUrl('/summary');
  }

}