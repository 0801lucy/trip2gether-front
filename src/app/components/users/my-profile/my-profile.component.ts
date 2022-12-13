import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  formulario: FormGroup

  constructor() {
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
  }

  ngOnInit(): void {
  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  }

}
