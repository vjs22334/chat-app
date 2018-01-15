import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent } from './signup/signup.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';




const appRoutes: Routes = [
{ path: 'chat', component: ChatComponent },
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'loggedIn', component: LoggedInComponent },

{ path: '',
 component: HomeComponent },
{ path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: false }
      ),
  ],
  exports: [
  RouterModule
  ]
})
export class AppRoutingModule { }
