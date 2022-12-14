import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';


@Component({
  selector: 'app-comments-trips',
  templateUrl: './comments-trips.component.html',
  styleUrls: ['./comments-trips.component.css']
})
export class CommentsTripsComponent implements OnInit {

  form: FormGroup;
  tripid: number

  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService) {
    this.form = new FormGroup({
      inputMessage: new FormControl()
    })

    this.tripid = 0


  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.tripid = parseInt(params['tripId'])

    })
  }

  onSubmit() {
    console.log(this.form.value.inputMessage) //esto es el mensaje
    console.log(this.tripid) // esto el el id del trip
    //llamar al metodo createComment que esta en el service
    this.tripsService.createComment(this.form.value.inputMessage, this.tripid)
  }
}

