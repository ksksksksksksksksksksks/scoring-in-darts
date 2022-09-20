import { Injectable } from '@angular/core';
import { Player } from './domain/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  players: Player[] = [
    {name: 'Sherlock Holmes', email: 'sherlock.holmes@gmail.com'},
    {name: 'Dr. John Watson', email: 'dr.john.watson@gmail.com'},
    {name: 'Mrs. Stubbs', email: 'stubbs@gmail.com'},
    {name: 'Jim Moriarty', email: 'jim.moriarty@gmail.com'}
  ];

  constructor() { }
      
  getPlayer(): Player[] {    
    return this.players;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(element: Player) {
    this.players.forEach( (value, index) => {
      if (value == element) this.players.splice(index, 1);
    });
  }

}
