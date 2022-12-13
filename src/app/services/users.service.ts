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
    this.baseUrl = `${environment.apiUrl}/users`
  }

  register(pValues: any) {

    console.log(pValues)
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`, pValues)
    )
  }
  login(pValues: any) {
    console.log(pValues)

    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`, pValues)
    )
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
