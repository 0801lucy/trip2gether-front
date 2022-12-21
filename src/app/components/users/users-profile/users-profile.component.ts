import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  formulario!: FormGroup;
  profile: any;
  rating: number;
  ratingArray: Array<number>;
  serverUrl: string;

  constructor(private usersService: UsersService) {

    this.serverUrl = environment.serverUrl;

    this.profile = '';
    this.rating = 0;
    this.ratingArray = []
  }

  async ngOnInit() {
    const response = await this.usersService.getProfile()
    this.profile = response;
    this.rating = response.rating;
    this.ratingArray = Array(5).fill(1)

    this.formulario = new FormGroup({
      name: new FormControl(response.name),
      surname: new FormControl(response.surname),
      username: new FormControl(response.username),
      img_user: new FormControl(response.img_user),
      phone: new FormControl(response.phone),
      email: new FormControl(response.email),
      birth_date: new FormControl(response.birth_date),
      hobbies: new FormControl(response.hobbies),
      personality: new FormControl(response.personality)
    })
    console.log(response);
  }

}
