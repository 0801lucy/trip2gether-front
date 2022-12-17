import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-maps-trips',
  templateUrl: './maps-trips.component.html',
  styleUrls: ['./maps-trips.component.css']
})
export class MapsTripsComponent implements OnInit {

  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;

  paises: any[]

  constructor(private paisesService: PaisesService) {
    this.lat = 40;
    this.lng = -3;
    this.zoom = 6;
    this.mapTypeId = 'hybrid';
    this.paises = []
  }

  ngOnInit() {
    this.paisesService.getAll()
      .then(paises => this.paises = paises)
      .catch(error => console.log(error))

  }

}
