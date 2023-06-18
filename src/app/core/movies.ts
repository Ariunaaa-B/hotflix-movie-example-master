export interface Rating {
  Value: string;
  Source: string;
}

export interface Movie {
  id: string | null;
  title: string | null;
  year: number | null;
  rated: string | null;
  released: string | null;
  runtime: string | null;
  genre: string | null;
  director: string | null;
  writer: string | null;
  actors: string | null;
  plot: string | null;
  language: string | null;
  country: string | null;
  awards: string | null;
  poster: string | null;
  ratings: Rating[] | null;
  metaScore: number | null;
  imdbRating: number | null;
  imdbVotes: number | null;
  type: string | null;
  dvd: string | null;
  boxOffice: string | null;
  production: string | null;
  website: string | null;
  response: number | null;
}
