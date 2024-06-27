export class Cast {
  castId: number;
  personName: string;
  personId: number;
  movieCount: number;
  profilePath? : string;

  constructor(castId: number,personId:number, personName: string, starredIn: number) {
    this.castId = castId;
    this.personId = personId;
    this.personName = personName;
    this.movieCount = starredIn;
  }
}
