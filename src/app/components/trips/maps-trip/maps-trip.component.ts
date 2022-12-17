import { Component, OnInit } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-maps-trip',
  templateUrl: './maps-trip.component.html',
  styleUrls: ['./maps-trip.component.css']
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
