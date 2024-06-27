export class Person {
    
    personId : number;
    personName : string;
    gender: number;
    profilePath: string;
  
    constructor(
      id: number,
      name: string,
      gender:number,
      profileUrl:string
    ) {
        this.personId = id;
        this.personName = name;
        this.gender = gender;
        this.profilePath = profileUrl;
    }
  }
  