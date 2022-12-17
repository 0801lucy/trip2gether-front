import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogged!: User;
  serverUrl: string;

  constructor(private router: Router, private usersService: UsersService, public sanitizer: DomSanitizer) {


    this.serverUrl = environment.serverUrl;
  }

  async ngOnInit() {
    this.userLogged = await this.usersService.getProfile()
  }

  onLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
