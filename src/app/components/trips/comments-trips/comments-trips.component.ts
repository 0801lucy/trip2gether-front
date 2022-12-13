import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-comments-trips',
  templateUrl: './comments-trips.component.html',
  styleUrls: ['./comments-trips.component.css']
})
export class CommentsTripsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  sendMessage() {

  }

}
