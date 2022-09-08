import { Injectable } from '@angular/core';
import { Player } from './domain/player';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Player[] = [];

  constructor() { }

  addUser(user: Player) {
    this.users.push(user);
    console.log(this.users);
  }

  searchUser(str: string): Player[] {
    console.log(this.users.filter( (value: Player, index: number, array: Player[]) => value.name.startsWith(str)));
    return this.users.filter( (value: Player, index: number, array: Player[]) => value.name.startsWith(str));
  }

}
