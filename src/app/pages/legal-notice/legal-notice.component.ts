import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

  constructor(private router: Router) {}

  /**
  * Function to navigate back to the login page
  */
  goBack() {
    this.router.navigateByUrl('/summary');
  }

}