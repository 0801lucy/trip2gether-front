import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  formulario!: FormGroup;
  bloqueo: boolean;
  user: any;
  tripsOwn: any;
  tripsSubscribed: any;
  serverUrl: string;
  files: any;
  profile: any;
  rating: number;
  ratingArray: Array<number>;


  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService,
    private tripsService: TripsService, private router: Router, private sanitizer: Sanitizer
  ) {

    this.serverUrl = environment.serverUrl;
    this.bloqueo = true;
    this.profile = '';
    this.rating = 0;
    this.ratingArray = []
  }

  async ngOnInit(): Promise<void> {
    const response = await this.userService.getProfile()
    this.profile = response;
    this.rating = response.rating;
    this.ratingArray = Array(5).fill(1)
    this.formulario = new FormGroup
      ({
        name: new FormControl(response.name, [
          Validators.required,
          Validators.minLength(3)
        ]),

        surname: new FormControl(response.surname, [
          Validators.required,
        ]),

        username: new FormControl(response.username, [
          Validators.required,
        ]),

        password: new FormControl('********'),

        phone: new FormControl(response.phone, [
          Validators.required,
        ]),

        email: new FormControl(response.email),

        img_user: new FormControl(response.img_user, [
          Validators.required,
        ]),

        birth_date: new FormControl(dayjs(response.birth_date).format('YYYY-MM-DD'), [
          Validators.required,
        ]),
        hobbies: new FormControl(response.hobbies, [
          Validators.required,
        ]),
        personality: new FormControl(response.personality, [
          Validators.required,
        ])
      })


    this.activatedRoute.params.subscribe(async params => {
      const userId = parseInt(params['userId']);
      this.user = await this.userService.getUserById(userId);
    })

    this.tripsOwn = await this.tripsService.getTripsByUser();
    this.tripsSubscribed = await this.tripsService.getUserSubscribed();
  }

  async onSubmit() {
    let changeProfile = new FormData();
    changeProfile.append('name', this.formulario.value.name);
    changeProfile.append('surname', this.formulario.value.surname);
    changeProfile.append('username', this.formulario.value.username);
    changeProfile.append('email', this.formulario.value.email);
    changeProfile.append('phone', this.formulario.value.phone);
    changeProfile.append('hobbies', this.formulario.value.hobbies);
    changeProfile.append('personality', this.formulario.value.personality);
    changeProfile.append('birth_date', this.formulario.value.birth_date);
    changeProfile.append('img_user', this.files[0]);

    const response = await this.userService.updateProfile(changeProfile);

    if (response.success) {
      alert(response.success);
      this.router.navigate(['/myprofile'])
    } else {
      alert('Cambios Guardados')
    }
  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  };

  onChange($event: any) {
    this.files = $event.target.files;
  }

  onClick() {
    this.bloqueo = !this.bloqueo
  }

}

