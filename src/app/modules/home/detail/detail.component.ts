import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  movie!: Movie;
  constructor(route: ActivatedRoute) {
    console.log('Received Movie ID:', route.snapshot.paramMap.get('id'));
    route.data.subscribe((data: any) => {
      this.movie = data.movie;
      console.log(data.movie);
    });
  }
}
