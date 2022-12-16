import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  formulario: FormGroup;
  bloqueo: boolean;
  user: any;
  tripsOwn: any;
  tripsSuscribed: any;
  serverUrl: string;



  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService,
    private tripsService: TripsService, private router: Router
  ) {

    this.serverUrl = environment.serverUrl;
    this.formulario = new FormGroup
      ({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),

        surname: new FormControl('', [
          Validators.required,
        ]),

        username: new FormControl('', [
          Validators.required,
        ]),

        password: new FormControl('', [
          Validators.required,
        ]),

        phone: new FormControl('', [
          Validators.required,
        ]),

        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)
        ]),
        birth_date: new FormControl('', [
          Validators.required,
        ]),
        hobbies: new FormControl('', [
          Validators.required,
        ]),
        personality: new FormControl('', [
          Validators.required,
        ])
      })

    this.bloqueo = true;
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(async params => {
      const userId = parseInt(params['userId']);
      this.user = await this.userService.getUserById(userId);
      console.log(this.user)
    })

    this.tripsOwn = await this.tripsService.getTripsByUser();
    this.tripsSuscribed = await this.tripsService.getUserSuscrited();

  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  };


  pulsarBoton() {
    this.bloqueo = !this.bloqueo
  }


}

