import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HoverService } from '../../services/hover.service';
import { GreetingService } from '../../services/greeting.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {


  constructor(
    public us: UserService,
    private router: Router,
    public hs: HoverService,
    public gt: GreetingService
  ) {}

 /**
 * ngOnInit is an Angular lifecycle hook that is called after the component is initialized.
 */
  ngOnInit() {
    this.gt.generateGreeting();
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.us.authToken = storedToken;
    }
    console.log(this.us.userData);
  }

  /**
 * Navigates to the '/board' route using the Angular Router.
 * Updates the active link in the 'hs' (assuming it stands for some service) to 'board'.
 */
  navigateToBoard() {
    this.router.navigateByUrl('/board');
    this.hs.activeLink = 'board';
  }
  
  /**
 * Sets the 'hoverTodo' property to true, indicating that the todo element is currently being hovered.
 */
  onHoverTodo() {
    this.hs.hoverTodo = true;
  }

  /**
 * Sets the 'hoverTodo' property to false, indicating that the hover state on the todo element has ended.
 */
  onLeaveTodo() {
    this.hs.hoverTodo = false;
  };

  /**
 * Sets the 'hoverDone' property to true, indicating that the associated element is currently being hovered.
 */
  onHover() {
    this.hs.hoverDone = true;
  }

  /**
 * Sets the 'hoverDone' property to false, indicating that the hover state on the associated element has ended.
 */
  onLeave() {
    this.hs.hoverDone = false;
  }
}