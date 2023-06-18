import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Movie } from './movies';
import { environment } from 'src/environments/environment';

export interface MovieState {
  page: number;
  rows: number;
  sortField: string;
  sortOrder: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _movieState = new BehaviorSubject<MovieState>({
    page: 0,
    rows: 50,
    sortField: 'imdbRating',
    sortOrder: 1,
  });
  movieState$ = this._movieState.asObservable();

  movies$ = this.movieState$.pipe(
    switchMap((state) =>
      this.http.get<Movie[]>(
        `${environment.movie}?page=${state.page}&size=${state.rows}&sort=${
          state.sortField
        },${state.sortOrder ? 'desc' : 'asc'}`,
        { observe: 'response' }
      )
    ),
    map((res: HttpResponse<Movie[]>) => {
      const total = res.headers?.get('X-Total-Count');
      return {
        data: res.body as Movie[],
        totalRecords: total ? +total : 0,
        sortOrder: this._movieState.value.sortOrder,
        sortField: this._movieState.value.sortField,
      };
    })
  );

  constructor(private http: HttpClient) {}

  updateMovieState(state: Partial<MovieState>) {
    this._movieState.next({ ...this._movieState.value, ...state });
  }
}