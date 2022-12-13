import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(private usersService: UsersService) {
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
    } else {

      alert('Error  en el login ')
    }
  }
  checkError(field: string, error: string): boolean | undefined {
    return this.form.get(field)?.hasError(error)
      &&
      this.form.get(field)?.touched
  }

}





