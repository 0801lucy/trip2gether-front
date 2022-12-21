import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  formulario: FormGroup;
  profile: any;
  rating: number;
  ratingArray: Array<number>;

  constructor(private usersService: UsersService) {

    this.formulario = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      birth_date: new FormControl(),
      hobbies: new FormControl(),
      personality: new FormControl()
    })

    this.profile = '';
    this.rating = 0;
    this.ratingArray = []
  }

  async ngOnInit() {
    const response = await this.usersService.getProfile()
    this.profile = response;
    this.rating = response.rating;
    this.ratingArray = Array(5).fill(1)
  }

}
