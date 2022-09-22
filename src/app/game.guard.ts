import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PlayerService } from 'src/app/player.service';

@Injectable({
    providedIn: 'root'
})
export class GameGuard implements CanActivate{

    constructor(private playerService: PlayerService) {
    }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
         return this.playerService.players.length > 1;
    }
}