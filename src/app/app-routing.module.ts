import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { RegisterComponent } from './components/users/register.component'
//import { LoginComponent } from './components/users/login.component'

const routes: Routes = [
  //{ path: 'users/registro', component: RegisterComponent },
  //{ path: 'users/login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
