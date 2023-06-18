import { Component } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { MovieService } from 'src/app/core/movie.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  items!: MenuItem[];
  sortOptions: SelectItem[] = [];
  searchInput = '';
  sortOrder: number = 0;
  sortField: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.sortOptions = [
      { label: 'Rating High to Low', value: '!imdbRating' },
      { label: 'Rating Low to High', value: 'imdbRating' },
    ];
    this.items = [
      {
        label: 'Catalog',
        items: [
          {
            label: 'Action',
          },
          {
            label: 'Comedy',
          },
          {
            label: 'Horror',
          },
        ],
      },
    ];
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.movieService.updateMovieState({
        sortField: value.substring(1),
        sortOrder: 0,
      });
    } else {
      this.movieService.updateMovieState({
        sortField: value,
        sortOrder: 1,
      });
    }
  }
  onFilter(event: Event) {
    // this.movieService.searchSubject$.next(this.searchInput);
  }
}
