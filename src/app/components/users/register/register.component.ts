import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  formulario: FormGroup;

  constructor(private usersService: UsersService) {
    this.formulario = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.maxLength(60)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(45)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(9)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)
      ]),
      birth_date: new FormControl(),
      hobbies: new FormControl('', [
        Validators.required,
        Validators.maxLength(600)
      ]),
      personality: new FormControl('', [
        Validators.required,
        Validators.maxLength(600)
      ]),
    })
  }

  ngOnInit(): void {
  }


  async onSubmit() {
    const response = await this.usersService.register(this.formulario.value);
    console.log(response)
    // if(response.success){
    // alert(response.success);
    //this.formulario.reset();
    //}else{
    // alert('revisa tus errores');
    //}
    //poner el alert preguntar si es success
  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error)
      &&
      this.formulario.get(field)?.touched
  }
}
