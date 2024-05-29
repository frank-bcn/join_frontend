import { Component } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrl: './comment-page.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translate(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translate(0)' })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({ transform: 'translate(+100%)' })),
      ]),
    ]),
  ],
})
export class CommentPageComponent {
  newQuestionText: string = '';

  constructor(
    public cs: CommentService,
    public ts: TaskService,
    public us: UserService
  ) {}

  /**
   * Lifecycle hook called after Angular initializes the component.
   * Loads comments when the component initializes.
   */
  ngOnInit() {
    this.cs.loadComments();
  }

  /**
   * Closes the comment section and reloads the comments.
   */
  closeComment() {
    this.cs.isComment = false;
    this.cs.loadComments();
  }

  /**
   * Checks if there are any comments associated with the currently open task.
   * @returns A boolean indicating whether there are comments for the open task.
   */
  checkComments(): boolean {
    return this.cs.comments.some(
      (comment) => comment.taskId === this.ts.openTaskData.id
    );
  }

  /**
   * Retrieves the color associated with a user based on their authorId.
   * @param authorId The ID of the author whose color is to be retrieved.
   * @returns The color associated with the user, or 'transparent' if the user is not found.
   */
  loadUserColor(authorId: string): string {
    let user = this.us.users.find((user) => user.user_id === authorId);
    return user ? user.user_color : 'transparent';
  }

  /**
   * Retrieves the username initials based on the user's ID.
   * @param authorId The ID of the user.
   * @returns The username initials if the user is found, otherwise 'Unknown'.
   */
  loadUsername(authorId: string): string {
    let user = this.us.users.find((user) => user.user_id === authorId);
    if (user) {
      return this.userInitials(user.first_name, user.last_name);
    } else {
      return 'Unknown';
    }
  }

  /**
   * Generates user initials based on the provided first name and last name.
   * @param firstName The first name of the user.
   * @param lastName The last name of the user.
   * @returns The user initials if both first name and last name are provided, otherwise 'N/A'.
   */
  userInitials(firstName: string, lastName: string): string {
    if (!firstName || !lastName) {
      return 'N/A';
    }
    return firstName.charAt(0) + lastName.charAt(0);
  }

  /**
   * Creates a new question if the input text is not empty. It calls the service method to create the question
   * and resets the input text to an empty string.
   */
  createQuestion() {
    if (this.newQuestionText.trim() !== '') {
      this.cs.createQuestion(this.newQuestionText);
      this.newQuestionText = '';
    }
  }
}
