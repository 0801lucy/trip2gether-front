import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  register(pValues: any) {

    console.log(pValues)
    //return firstValueFrom(
    // this.httpClient.post<any>('http://trip2gether/api/users/register', pValues)
    //)
  }
  login(pValues: any) {
    console.log(pValues)

    // return firstValueFrom(
    //  this.httpClient.post<any>('http://trip2gether/api/users/login', pValues)
    //)
  }

  //isLogget(): boolean {
  // if (localStorage.getItem('tokrn')) {
  // return true;
  //} else {
  //  return false;
  // }
  // }
}
