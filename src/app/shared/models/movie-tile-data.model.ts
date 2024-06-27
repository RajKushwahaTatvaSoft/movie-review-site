export class MovieTileData{
    movieId : number;
    title : string;
    posterUrl : string;
    rating : number;
    duration : number;

    constructor(movieId:number,title:string,posterUrl:string,rating:number,duration:number){
        this.movieId = movieId;
        this.title = title;
        this.posterUrl =posterUrl;
        this.rating = rating;
        this.duration = duration;
    }
}