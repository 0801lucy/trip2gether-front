import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

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
  tripsSuscribed: any;
  serverUrl: string;
  files: any;
  profile: any


  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService,
    private tripsService: TripsService, private router: Router, public sanitizer: DomSanitizer
  ) {

    this.serverUrl = environment.serverUrl;
    this.bloqueo = true;
    this.profile = '';
  }

  async ngOnInit(): Promise<void> {
    const response = await this.userService.getProfile()
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

        password: new FormControl('*******', [
          Validators.required,
        ]),

        phone: new FormControl(response.phone, [
          Validators.required,
        ]),

        email: new FormControl(response.email, [
          Validators.required,
          Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)
        ]),
        birth_date: new FormControl(response.birth_date, [
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
      console.log(this.user)
    })

    this.tripsOwn = await this.tripsService.getTripsByUser();
    this.tripsSuscribed = await this.tripsService.getUserSuscrited();
    let changeProfile = new FormData(); {
      changeProfile.append('img_user', this.files[0]);
      changeProfile.append('name', this.formulario.value.name);
      changeProfile.append('surname', this.formulario.value.surname);
      changeProfile.append('username', this.formulario.value.username);
      changeProfile.append('phone', this.formulario.value.phone);
      changeProfile.append('hobbies', this.formulario.value.hobbies);
      changeProfile.append('personality', this.formulario.value.personality);
      changeProfile.append('birth_date', this.formulario.value.birth_date);
      const response = await this.userService.updateProfile(changeProfile);


      if (response.success) {
        alert(response.success);
      } else {
        alert('Revisa los errores');
      }
    }

  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  };

  onChange($event: any) {
    this.files = $event.target.files;
  }

  pulsarBoton() {
    this.bloqueo = !this.bloqueo
  }

  async onSubmit() {
    const response = await this.userService.updateProfile(this.formulario.value)
    console.log(response);

    if (response.success) {
      alert('Perfil actualizado!');
    } else {
      alert('Ha habido algún problema, comprueba todos los datos')
    }
  }

}

