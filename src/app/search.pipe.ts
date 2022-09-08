import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './domain/player';

@Pipe({
    name:'search'
})

export class SearchPipe implements PipeTransform {
    transform(players: Player[], strInput: string): Player[] {     
        if (!strInput) {
            return [];
        }

        strInput = strInput.toLowerCase();
        return players.filter( (value: Player) => value.name.toLowerCase().includes(strInput));
    }  
}