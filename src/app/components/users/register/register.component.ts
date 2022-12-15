import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formulario: FormGroup;
  files: any;

  constructor(private usersService: UsersService,
    private router: Router) {
    this.formulario = new FormGroup({
      name: new FormControl('Pepito', [
        Validators.required,
        Validators.minLength(3)
      ]),
      surname: new FormControl('Grillo', [
        Validators.required,
        Validators.maxLength(60)
      ]),
      username: new FormControl('pepeg', [
        Validators.required,
        Validators.maxLength(45)
      ]),
      password: new FormControl('123456', [
        Validators.required,
        Validators.minLength(6)
      ]),
      phone: new FormControl('666666666', [
        Validators.required,
        Validators.maxLength(9)
      ]),
      email: new FormControl('pepito@gmail.com', [
        Validators.required,
        Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)
      ]),
      birth_date: new FormControl('1980-10-23'),
      hobbies: new FormControl('prueba', [
        Validators.required,
        Validators.maxLength(600)
      ]),
      personality: new FormControl('prueba', [
        Validators.required,
        Validators.maxLength(600)
      ]),
    })
  }

  ngOnInit(): void {
  }


  async onSubmit() {
    let fd = new FormData();
    fd.append('img_user', this.files[0]);
    fd.append('name', this.formulario.value.name);
    fd.append('surname', this.formulario.value.surname);
    fd.append('username', this.formulario.value.username);
    fd.append('email', this.formulario.value.email);
    fd.append('password', this.formulario.value.password);
    fd.append('phone', this.formulario.value.phone);
    fd.append('hobbies', this.formulario.value.hobbies);
    fd.append('personality', this.formulario.value.personality);
    fd.append('birth_date', this.formulario.value.birth_date);

    const response = await this.usersService.register(fd);

    if (response.success) {
      alert(response.success);
      this.router.navigate(['/login'])
    } else {
      alert('revisa tus errores');
    }

  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error)
      &&
      this.formulario.get(field)?.touched
  }
}
