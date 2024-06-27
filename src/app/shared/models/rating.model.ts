export class Rating {
  ratingId: number = 0;
  userName: string;
  description: string;
  rating: number;
  reviewDate: string;
  isModified: boolean;
  movieId : number = 0;
  userProfileUrl : string = '';

  constructor(
    userName: string,
    desc: string,
    rating: number,
    date: string,
    isModified: boolean
  ) {
    this.userName = userName;
    this.description = desc;
    this.rating = rating;
    this.reviewDate = date;
    this.isModified = isModified;
  }
}
