export class Rating {
    
    userName : string;
    description : string;
    rating : number;
    reviewDate : string;
    isModified : boolean;
  
    constructor(
      userName: string,
      desc: string,
      rating:number,
      date : string,
      isModified:boolean,
    ) {
        this.userName = userName;
        this.description = desc;
        this.rating = rating;
        this.reviewDate = date;
        this.isModified = isModified;
    }
  }
  