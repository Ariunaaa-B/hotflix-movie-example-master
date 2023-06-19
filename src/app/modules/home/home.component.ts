import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieService } from 'src/app/core/movie.services';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [''],
})
export class HomeComponent {
  @ViewChild('dataView') dataView: any;
  movies: Movie[] = [];

  sortOrder: number = -1;
  sortField: string = 'imdbRating';
  totalRecords = 0;
  rows = 4;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {
  }

  ngOnInit() {
    // this.activatedRoute.data.subscribe((data: any) => {
    //   this.movies = data.movies;
    // });
    this.movieService.movies$.subscribe((moviesData) => {
      this.movies = moviesData.data;
      this.sortOrder = moviesData.sortOrder;
      this.sortField = moviesData.sortField;
      this.totalRecords = moviesData.totalRecords;
    });
    // this.movieService.searchSubject$.subscribe((search: any) => {
    //   this.dataView?.filter(search);
    // });
    // this.movieService.getMovies().subscribe((movies) => {
    //   this.movies = movies;
    // });
  }
  next(event: any) {
    console.log(this.movies);
    const nextPage = event.first / event.rows + 1;
    this.movieService.updateMovieState({
      page: nextPage,
      rows: this.rows,
    });
  }
  
}