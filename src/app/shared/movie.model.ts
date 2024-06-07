export class Movie {
  movieId: number;
  title: string;
  releaseDateStr?: string;
  revenue: number;
  overview?: string;
  popularity: number;
  imdbId?: string;
  budget: number;
  genres: string;
  rating: number;
  duration? : number;
  posterUrl?: string;
  ratingCount: number;
  genreList?: string[] = [];

  constructor(
    id: number,
    title: string,
    revenue:number,
    popularity:number,
    budget:number,
    rating: number,
    genres: string,
    ratingCount: number
  ) {
    this.movieId = id;
    this.title = title;
    this.genres = genres;
    this.rating = rating;
    this.revenue = revenue;
    this.popularity = popularity;
    this.budget = budget;
    this.ratingCount = ratingCount;
  }
}
