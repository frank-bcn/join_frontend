import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SummaryComponent } from './pages/summary/summary.component';
import { BoardComponent } from './pages/board/board.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditContactComponent } from './pages/contacts/edit-contact/edit-contact.component';
import { NewContactComponent } from './pages/contacts/new-contact/new-contact.component';
import { SelectedUserComponent } from './pages/contacts/selected-user/selected-user.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskComponent } from './pages/task/task.component';
import { EditAccountComponent } from './pages/edit-account/edit-account.component';
import { OpenEditTaskComponent } from './pages/open-edit-task/open-edit-task.component';
import { OpenTaskComponent } from './pages/open-task/open-task.component';


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
    EditContactComponent,
    NewContactComponent,
    SelectedUserComponent,
    TaskComponent,
    EditAccountComponent,
    OpenEditTaskComponent,
    OpenTaskComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
