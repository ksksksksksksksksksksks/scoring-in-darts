import { Injectable } from '@angular/core';
import { Player } from 'src/app/domain/player';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PlayerService } from 'src/app/player.service';

@Injectable({
    providedIn: 'root'
})
export class GameGuard implements CanActivate{

    public players!: Player[];

    constructor(private playerService: PlayerService) {
        this.players = this.playerService.players;
    }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
         if (this.players.length > 1) {
            return true;
         }
         else {
            return false;
         }
    }
}