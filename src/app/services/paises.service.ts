import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  baseUrl: string;

  constructor(private HttpClient: HttpClient) {
    this.baseUrl = 'https://https://restcountries.com/v2/all';
  }

  getAll(): Promise<any[]> {
    return this.HttpClient.get<any>(this.baseUrl).toPromise();

  }
}
