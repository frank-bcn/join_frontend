import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { SummaryComponent } from './pages/summary/summary.component';
import { BoardComponent } from './pages/board/board.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SummaryComponent,
    BoardComponent,
    AddTaskComponent,
    ContactsComponent,
    ForgotPasswordComponent,
    HelpPageComponent,
    LegalNoticeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
