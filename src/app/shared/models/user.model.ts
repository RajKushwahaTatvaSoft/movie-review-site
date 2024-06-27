export class User {
    
    userId : number;
    firstName : string;
    lastName: string;
    userRole: string;
    roleId : number = 0;
    email: string;
    profilePath? : string;
  
    constructor(
      id: number,
      firstName: string,
      lastName:string,
      role:string,
      email:string,
    ) {
        this.userId = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userRole = role;
        this.email = email;
    }
  }
  