import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() index: number=0;
  @Input() movie: Movie={
    id: null,
    title: null,
    year: null,
    rated: null,
    released: null,
    runtime: null,
    genre: null,
    director: null,
    writer: null,
    actors: null,
    plot: null,
    language: null,
    country: null,
    awards: null,
    poster: null,
    ratings: null,
    metaScore: null,
    imdbRating: null,
    imdbVotes: null,
    type: null,
    dvd: null,
    boxOffice: null,
    production: null,
    website: null,
    response: null
  };
}
