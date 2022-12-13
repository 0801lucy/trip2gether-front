import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/users`;
  }

  register(pValues: any) {

    console.log(pValues)
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, pValues)
    )
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
