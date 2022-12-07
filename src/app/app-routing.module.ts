import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { UsersComponent } from './components/users/users.component'
//import { LoginComponent } from './components/users/login.component'

const routes: Routes = [
  //{ path: 'users/registro', component: UsersComponent },
  //{ path: 'user/login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
