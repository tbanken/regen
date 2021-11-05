import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: AppComponent, pathMatch: 'full',},
{ path: 'users/login', component: LoginComponent, pathMatch: 'full'},
{ path: 'users/register', component: RegisterComponent, pathMatch: 'full'},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
