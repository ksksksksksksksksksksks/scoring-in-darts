import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectGameComponent } from './select-game/select-game.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { GameComponent } from './game/game.component';

import { ReactiveFormsModule } from '@angular/forms';

const routes = [
  { path:'', component: SelectGameComponent},
  { path: 'add-player', component: AddPlayerComponent},
  { path: 'game', component: GameComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SelectGameComponent,
    AddPlayerComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
