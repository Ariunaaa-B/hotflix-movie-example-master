import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { MovieService } from 'src/app/core/movie.services';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnDestroy {
  @ViewChild('dataView') dataView: any;
  movies: Movie[] = [];
  virtualMovies: Movie[] = [];
  page = 0;
  totalRecords = 0;

  sortOrder: number = -1;
  sortField: string = 'imdbRating';

  private moviesSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.moviesSubscription = this.movieService.movies$.subscribe((moviesData) => {
      this.movies.push(...moviesData.data);
      this.sortOrder = moviesData.sortOrder;
      this.sortField = moviesData.sortField;
      this.totalRecords = moviesData.totalRecords;

      const loadedMovies = this.movies.slice(0, 16);
      this.virtualMovies.splice(0, loadedMovies.length, ...loadedMovies);
    });
  }
  ngOnInit() {
    this.virtualMovies = Array(1237).fill(null);
  }

  ngOnDestroy() {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
  }

  loadMoviesLazy(event: any) {

    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
    if (this.page < 24) {
      this.page ++;
      this.movieService.updateMovieState({
        page: this.page,
      });
      this.moviesSubscription = this.movieService.movies$.subscribe((moviesData) => {
        this.movies.push(...moviesData.data);
      });
    }
    const loadedMovies = this.movies.slice(event.first, event.first + event.rows);
    this.virtualMovies.splice(event.first, loadedMovies.length, ...loadedMovies);
    event.forceUpdate();
  }
}
