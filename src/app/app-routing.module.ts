import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { BoardComponent } from './pages/board/board.component';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'join', component: AppComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'board', component: BoardComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'help', component: HelpPageComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
