import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import * as dayjs from 'dayjs';

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

  constructor(private usersService: UsersService, private activatedRoute: ActivatedRoute) {

    this.serverUrl = environment.serverUrl;

    this.profile = '';
    this.rating = 0;
    this.ratingArray = []
  }

  async ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      this.profile = await this.usersService.getUserById(params['userId']);

      this.formulario = new FormGroup({
        name: new FormControl(this.profile.name),
        surname: new FormControl(this.profile.surname),
        username: new FormControl(this.profile.username),
        img_user: new FormControl(this.profile.img_user),
        phone: new FormControl(this.profile.phone),
        email: new FormControl(this.profile.email),
        birth_date: new FormControl(dayjs(this.profile.birth_date).format('YYYY-MM-DD')),
        hobbies: new FormControl(this.profile.hobbies),
        personality: new FormControl(this.profile.personality)
      })
      this.rating = this.profile.rating;
      this.ratingArray = Array(5).fill(1)
    })
  }

  historyBack() {
    window.history.back();
  }

}
