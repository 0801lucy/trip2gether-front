import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-comments-trips',
  templateUrl: './comments-trips.component.html',
  styleUrls: ['./comments-trips.component.css']
})
export class CommentsTripsComponent implements OnInit {

  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      inputMessage: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log()
  }
}