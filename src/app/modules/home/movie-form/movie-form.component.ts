import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/movies';
import { movieEntity } from './movie.entity';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styles: [],
})
export class MovieFormComponent {
  movieForm: FormGroup;
  isNew = true;
  movieEntity = movieEntity;
  controlNames: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    let formControls = Object.keys(movieEntity).reduce((acc: any, key) => {
      acc[key] = [''];
      return acc;
    }, {});

    this.movieForm = this.fb.group(formControls);
    this.controlNames = Object.keys(movieEntity);

    console.log(this.movieForm);
    this.movieForm.valueChanges.pipe();

    this.activatedRoute.data.subscribe((data: any) => {
      this.setFormValues(data.movie);
    });
  }

  setFormValues(movie: Movie) {
    this.isNew = movie ? false : true;
    this.movieForm.patchValue(movie);
  }

  onSubmit() {
    if (this.movieForm.valid) {
      alert(JSON.stringify(this.movieForm.value));
    }
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      console.log(data, 'here');
    });
  }
}
