import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveFn, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieService } from 'src/app/core/movie.services';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { DetailComponent } from './detail/detail.component';

export const MovieFormResolver: ResolveFn<any> = (route) => {
  const id = route.paramMap.get('id'); // Assuming 'id' is the name of the route parameter
  console.log('Movie ID:', id);
  return inject(MovieService).movies$;
};
export const MoviesResolver: ResolveFn<any> = () => {
  return inject(MovieService).movies$;
};
const routes: Routes = [
  {
    path: '',
    resolve: { movies: MoviesResolver },
    component: HomeComponent
  },
  {
    path: 'movies/:id',
    resolve: { movie: MovieFormResolver },
    component: DetailComponent,
    // children: [
    //   {
    //     path: 'details',
    //     resolve: { movie: MovieFormResolver },
    //     component: DetailComponent
    //   },
    //   {
    //     path: 'edit',
    //     resolve: { movie: MovieFormResolver },
    //     component: MovieFormComponent
    //   }
    // ]
  },

  {
    path: ':id',
    resolve: { movie: MovieFormResolver },
    component: DetailComponent,
  },
  {
    path: 'edit/:id',
    component: MovieFormComponent,
    canActivate: [],
    resolve: { movie: MovieFormResolver },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [HomeComponent, MovieFormComponent, DetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class HomeModule { }
