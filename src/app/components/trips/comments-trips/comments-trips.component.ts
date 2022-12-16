import { ThisReceiver } from '@angular/compiler';
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
  tripid: number;
  userid: number;
  comments: any[];


  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService) {

    this.form = new FormGroup({
      inputMessage: new FormControl()
    });

    this.tripid = 0;
    this.userid = 0;
    this.comments = [];

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.tripid = parseInt(params['tripId']);

      this.comments = await this.tripsService.getCommentsByTrips(this.tripid)
      console.log(this.comments)
    })
  }

  async onSubmit() {
    const responseComments = await this.tripsService.createComment(this.form.value.inputMessage, this.tripid);
  }
}

