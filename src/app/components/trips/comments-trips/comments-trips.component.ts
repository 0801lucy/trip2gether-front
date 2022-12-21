import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-comments-trips',
  templateUrl: './comments-trips.component.html',
  styleUrls: ['./comments-trips.component.css']
})

export class CommentsTripsComponent implements OnInit {

  @Input() AcceptedUsers!: []

  form: FormGroup;
  tripid: number;
  userid: number;
  comments: any[];
  serverUrl: string;


  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService, public sanitizer: DomSanitizer) {

    this.form = new FormGroup({
      textMessage: new FormControl()
    });

    this.tripid = 0;
    this.userid = 0;
    this.comments = [];
    this.serverUrl = environment.serverUrl;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.tripid = parseInt(params['tripId']);
      this.comments = await this.tripsService.getCommentsByTrips(this.tripid);
    });
  }

  async onSubmit() {
    const responseComments = await this.tripsService.createComment(this.form.value.textMessage, this.tripid);
    this.comments = await this.tripsService.getCommentsByTrips(this.tripid);
    this.form.reset();
  }
}

