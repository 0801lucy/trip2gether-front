import { animate } from '@angular/animations';
import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'sweetalert';

  form: FormGroup
  constructor(private usersService: UsersService,
    private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })


  }

  ngOnInit(): void {

  }

  async onSubmit() {
    const response = await this.usersService.login(this.form.value);
    console.log(response)
    if (response.success) {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/trips'])
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Upsss...',
        text: 'Comprueba tu email y contraseña',
        confirmButtonColor: '#2E8682',
        footer: '<a href="http://localhost:4200/register">Tambien puedes registrate aquí...</a>'
      })
    }
  }

  checkError(field: string, error: string): boolean | undefined {
    return this.form.get(field)?.hasError(error)
      &&
      this.form.get(field)?.touched
  }



}











