import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  currentRoute: string;
  //un array de rutas publicas y rutas privadas

  publicUrls: string[];
  mostrarCabecera: boolean;


  constructor(private router: Router) {

    this.mostrarCabecera = true;
    this.publicUrls = ['/login', '/register', '/']
    this.currentRoute = "";
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(event.url);

        if (this.publicUrls.includes(event.url)) {
          this.mostrarCabecera = false;
        } else {
          this.mostrarCabecera = true;
        }
      }
    })

  }


}
