export enum UserRole {
  Admin = 1,
  Staff = 2,
  Customer = 3
}

export class UserDto {
  id:number;
  email:string;
  username:string;
  role_id:UserRole;
}

export class User {

  id:number;
  email:string;
  username:string;
  role:UserRole;

  source:UserDto;

  constructor(user:UserDto) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.role = user.role_id;
  }
}
